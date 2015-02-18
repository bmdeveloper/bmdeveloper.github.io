var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');

var javascriptFolder = 'js/';
var cssFolder = 'css/';
var productionCodeFolder = 'dist/'

gulp.task('js-linting-combining-minifying', function () {
    return gulp.src(javascriptFolder + '*.js') 
      .pipe(jshint()) 
      .pipe(jshint.reporter('default')) 
      .pipe(concat('all.min.js')) 
      .pipe(uglify()) 
      .pipe(gulp.dest(productionCodeFolder+'js')); 
});

gulp.task('less-compiling-minifying', function () {
    return gulp.src(cssFolder + '*.less')
      .pipe(less()) 
      .pipe(rename({
          suffix: ".min"
      }))
      .pipe(minifyCSS())
      .pipe(gulp.dest(productionCodeFolder+'css'));
});

gulp.task('watch', function() { 
    gulp.watch('js/*.js', ['js-linting-combining-minifying'], function () {});
    gulp.watch('css/*.less', ['less-compiling-minifying'], function () {});


}); 

// default gulp task
gulp.task('default', ['js-linting-combining-minifying','less-compiling-minifying','watch']);
