var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-replace');
var removeEmptyLines = require('gulp-remove-empty-lines');


var sourceFolder = 'src/';
var appFolder = 'src/app/';
var cssFolder = 'src/styles/';
var buildFolder = 'dist/';
var buildJS = '<script src="dist/js/all.min.js"></script>';
var DevJS = '<script src="src/app/core/app.js"></script>\n\t<script src="src/app/photo-details-view/photo-details.js"></script>\n\t<script src="src/app/photo-list-view/photo-list.js"></script>\n\t<script src="src/app/core/services.js"></script>';
var devCSS = cssFolder + 'main.css';
var buildCSS = buildFolder + 'styles/main.min.css';

//lint combine minify js 
gulp.task('js-linting-combining-minifying', function () {
    return gulp.src(appFolder + '**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(buildFolder + 'js'));
});

//lint dev js 
gulp.task('js-linting-dev', function () {
    return gulp.src(appFolder + '**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

//compile minify less
gulp.task('less-compiling-minifying', function () {
    return gulp.src(cssFolder + '*.less')
      .pipe(less())
      .pipe(rename({
          suffix: ".min"
      }))
      .pipe(minifyCSS())
      .pipe(gulp.dest(buildFolder + 'styles'));
});

//compile less for dev environment
gulp.task('less-compiling-dev', function () {
    return gulp.src(cssFolder + '*.less')
      .pipe(less())
      .pipe(gulp.dest(cssFolder));
});

//copy markup to build folder environment
gulp.task('markup-copy', function () {
    return gulp.src(appFolder + '**/*.html', { base: appFolder })
      .pipe(gulp.dest(buildFolder));
});

gulp.task('image-copy', function () {
    return gulp.src(sourceFolder + 'images/**/*.*', { base: appFolder })
      .pipe(gulp.dest(buildFolder + 'images'));
});

//replace all build links to dev links in index
gulp.task('replace-dev-main', function () {
    gulp.src(['index.html'])
      .pipe(replace(buildCSS, devCSS))
      .pipe(replace(buildJS, DevJS))
      .pipe(gulp.dest('./'));
});

//replace all dev links to build links in index
gulp.task('replace-build-main', function () {
    return gulp.src(['index.html'])
      .pipe(replace(devCSS, buildCSS))
      .pipe(replace('<script src="src/app/core/app.js"></script>', buildJS))
      .pipe(replace('<script src="src/app/photo-details-view/photo-details.js"></script>', ''))
      .pipe(replace('<script src="src/app/photo-list-view/photo-list.js"></script>', ''))
      .pipe(replace('<script src="src/app/core/services.js"></script>', ''))
      .pipe(removeEmptyLines())
      .pipe(gulp.dest('./'));
});

//replace all build links to dev links in views
gulp.task('replace-dev-viewsource', function () {
    return gulp.src([appFolder + '**/*.js', '!' + appFolder + 'core/'])
      .pipe(replace(buildFolder, appFolder))
      .pipe(gulp.dest(appFolder));
});

//replace all dev links to build links in views
gulp.task('replace-build-viewsource', function () {
    return gulp.src([appFolder + '**/*.js', '!' + appFolder + 'core/'])
      .pipe(replace(appFolder, buildFolder))
      .pipe(gulp.dest(appFolder));
});

gulp.task('watch', function () {
    gulp.watch(cssFolder + '*.less', ['less-compiling-dev'], function () { });
    gulp.watch(appFolder + '**/*.js', ['js-linting-dev'], function () { });
});

gulp.task('build', ['replace-build-viewsource', 'js-linting-combining-minifying', 'less-compiling-minifying', 'markup-copy', 'image-copy', 'replace-build-main']);

gulp.task('dev', ['less-compiling-dev', 'replace-dev-viewsource', 'replace-dev-main', 'watch']);

