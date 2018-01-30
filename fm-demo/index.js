var EventCenter = {
  on: function (type, handler) {
    $(document).on(type, handler)
  },
  fire: function (type, data) {
    $(document).trigger(type, data)
  }
}

var Footer = {
  init: function () { // 初始化
    this.$footer = $('footer')
    this.$ul = this.$footer.find('ul')
    this.$box = this.$footer.find('.box')
    this.$leftBtn = this.$footer.find('.icon-left')
    this.$rightBtn = this.$footer.find('.icon-right')
    this.isToEnd = false
    this.isToStart = true
    this.isAnimate = false; // 动画锁

    this.bind()
    this.render()
  },

  bind: function () { // 绑定事件
    var _this = this

    this.$rightBtn.on('click', function () { // 右键功能
      if (_this.isAnimate) return
      var itemWidth = _this.$box.find('li').outerWidth(true)
      var rowCount = Math.floor(_this.$box.width() / itemWidth)

      if (!_this.isToEnd) {
        _this.isAnimate = true
        _this.$ul.animate({
          left: '-=' + rowCount * itemWidth
        }, 400, function () {
          _this.isAnimate = false
          _this.isToStart = false

          if (parseFloat(_this.$box.width()) - parseFloat(_this.$ul.css('left')) >= parseFloat(_this.$ul.css('width'))) {
            _this.isToEnd = true
          }
        })
      }
    })

    this.$leftBtn.on('click', function () { // 左键功能
      if (_this.isAnimate) return
      var itemWidth = _this.$box.find('li').outerWidth(true)
      var rowCount = Math.floor(_this.$box.width() / itemWidth)

      if (!_this.isToStart) {
        _this.isAnimate = true
        _this.$ul.animate({
          left: '+=' + rowCount * itemWidth
        }, 400, function () {
          _this.isAnimate = false
          _this.isToEnd = false

          if (parseFloat(_this.$ul.css('left')) >= 0) {
            _this.isToStart = true
          }
        })
      }
    })

    this.$footer.on('click', 'li', function () { // 点击发布
      $(this).addClass('active').siblings().removeClass('active')

      EventCenter.fire('select-albumn', {
        channelId: $(this).attr('data-channel-id'),
        channelName: $(this).attr('data-channel-name')
      })
    })
  },

  render() {
    var _this = this
    $.getJSON('//api.jirengu.com/fm/getChannels.php') // 获取json数据
      .done(function (ret) { // 数据到来
        _this.renderFooter(ret.channels); // 渲染channels
      }).fail(function () {
      console.log('erro'); // 没有到来，打印error
    })
  },

  renderFooter: function (channels) { // 渲染功能
    var html = ''
    channels.forEach(function (channel) {
      html += '<li data-channel-id=' + channel.channel_id + ' data-channel-name=' + channel.name + '>'
        + '  <div class="cover" style="background-image:url(' + channel.cover_small + ')"></div>'
        + '  <h3>' + channel.name + '</h3>'
        + '</li>'
    })
    this.$ul.html(html)
    this.setStyle()
  },

  setStyle: function () { // 设置样式
    var count = this.$footer.find('li').length
    var width = this.$footer.find('li').outerWidth(true)
    this.$ul.css({
      width: count * width + 'px'
    })
  }
}

var Fm = {
  init: function () {
    this.$container = $('#page-music main')
    this.channelName = '00后'
    this.audio = new Audio()
    this.audio.autoplay = true
    this.collections = this.loadFromLocal()
    this.bind()

    this.playInit()
  },
  playInit: function () {
    if (this.collections.length > 0) {
      EventCenter.fire('select-albumn', {
        channelId: '0',
        channelName: '漫步春天'
      })
    }else {
      this.loadMusic()
    }
  },
  bind: function () {
    var _this = this
    EventCenter.on('select-albumn', function (e, channel) {
      _this.channelId = channel.channelId
      _this.channelName = channel.channelName
      _this.loadMusic()
    })

    this.$container.find('.btn-play').on('click', function () { // 播放和暂停的逻辑
      if ($(this).hasClass('icon-pause')) {
        $(this).removeClass('icon-pause').addClass('icon-play')
        _this.audio.pause()
      }else {
        $(this).removeClass('icon-play').addClass('icon-pause')
        _this.audio.play()
      }
    })

    this.$container.find('.btn-next').on('click', function () { //
      console.log('下一首')
      _this.loadMusic()
    })

    this.audio.addEventListener('play', function () {
      clearInterval(_this.statusClock)
      _this.statusClock = setInterval(function () {
        _this.updateStatus()
      }, 1000)
    })

    this.audio.addEventListener('pasue', function () {
      clearInterval(_this.statusClock)
      console.log('pause')
    })

    this.$container.find('.btn-collect').on('click', function () {
      var $btn = $(this)
      if ($btn.hasClass('active')) {
        $btn.removeClass('active')
        delete _this.collections[_this.currentSong.sid]
      }else {
        $(this).addClass('active')
        _this.collections[_this.currentSong.sid] = _this.currentSong
      }
      _this.saveToLocal()
    })
  },
  loadMusic(callback) { // 获取音乐
    var _this = this
    if (this.channelId === '0') {
      _this.loadCollection()
    }else {
      $.getJSON('//jirenguapi.applinzi.com/fm/getSong.php', {channel: this.channelId})
        .done(function (ret) {
          _this.song = ret['song'][0]
          _this.loadLyric()
          _this.play(ret.song[0] || null)
        })
    }
  },

  loadLyric() { // 加载歌词
    var _this = this
    $.getJSON('//jirenguapi.applinzi.com/fm/getLyric.php', {sid: this.song.sid})
      .done(function (ret) {
        var lyricObj = {}

        ret.lyric.split('\n').forEach(function (line) {
          var timeArr = line.match(/\d{2}:\d{2}/g)
          if (timeArr) {
            timeArr.forEach(function (time) {
              lyricObj[time] = line.replace(/\[.+?\]/g, '')
            })
          }
        })
        _this.lyricObj = lyricObj
      })
  },

  play: function (song) {
    console.log(song)
    this.currentSong = song
    this.audio.src = song.url
    this.$container.find('.btn-play').removeClass('icon-play').addClass('icon-pause')

    this.$container.find('.aside figure').css('background-image', 'url(' + song.picture + ')')
    $('.bg').css('background-image', 'url(' + song.picture + ')')
    this.$container.find('.detail h1').text(song.title)
    this.$container.find('.detail .author').text(song.artist)
    this.$container.find('.tag').text(this.channelName)

    if (this.collections[song.sid]) {
      this.$container.find('.btn-collect').addClass('active')
    }else {
      this.$container.find('.btn-collect').removeClass('active')
    }

    this.loadLyric(song.sid)
  },

  updateStatus() { // 更新状态
    var min = Math.floor(this.audio.currentTime / 60)
    var second = Math.floor(Fm.audio.currentTime % 60) + ''
    second = second.length === 2 ? second : '0' + second
    this.$container.find('.current-time').text(min + ':' + second)
    this.$container.find('.bar-progress').css('width', this.audio.currentTime / this.audio.duration * 100 + '%')

    var line = this.lyricObj['0' + min + ':' + second]
    if (line) {
      this.$container.find('.lyric p').text(line).boomText()
    }
  },
  loadFromLocal: function () {
    return JSON.parse(localStorage['collections'] || '{}')
  },
  saveToLocal: function () {
    localStorage['collections'] = JSON.stringify(this.collections)
  },
  loadCollection: function () {
    var keyArray = Object.keys(this.collections)
    if (keyArray.length === 0) return
    var randomIndex = Math.floor(Math.random() * keyArray.length)
    var randomSid = keyArray[randomIndex]
    this.play(this.collections[randomSid])
  }

}

$.fn.boomText = function (type) { // 歌词动画插件
  type = type || 'rollIn'
  console.log(type)
  this.html(function () {
    var arr = $(this).text()
      .split('').map(function (word) {
      return '<span class="boomText">' + word + '</span>'
    })
    return arr.join('')
  })

  var index = 0
  var $boomTexts = $(this).find('span')
  var clock = setInterval(function () {
    $boomTexts.eq(index).addClass('animated ' + type)
    index++
    if (index >= $boomTexts.length) {
      clearInterval(clock)
    }
  }, 100)
}

Footer.init()
Fm.init()
