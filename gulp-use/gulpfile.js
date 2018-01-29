var gulp = require('gulp')

var cssnano = require('gulp-cssnano')
var concat = require('gulp-concat')

gulp.task('css', function () { // gulp.task创建一个css任务

  gulp.src('./src/css/*.css') // 通过src定位到需要去处理的所有css文件，括号里是地址
    .pipe(concat('index-merge.css')) // 把所有的css文件合并成一个文件，文件名是index-merge.css
    .pipe(cssnano()) // index-merge.css文件传递到这里，进行压缩
    .pipe(gulp.dest('dist/css')) //压缩之后把文件输出到dist目录下的css目录
})


gulp.task('default', ['css'])