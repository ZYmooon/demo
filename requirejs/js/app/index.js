define(['jquery', 'com/gotop', 'com/carousel', 'com/getmore', 'com/waterfall'],
  function ($, goTop, Carousel, getMore, waterfall) {
    Carousel.init($('.carousel'))
    new goTop()
    getMore.init($('.btn-more'))
    waterfall.init($('.news'))
  })
