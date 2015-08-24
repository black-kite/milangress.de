"use strict";

var gulp = require('gulp'); 
var notify = require('gulp-notify');

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var php  = require('gulp-connect-php');
var browserSync = require('browser-sync');




gulp.task('connect-sync', function() {

  php.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  }); 
});



// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './assets/images/src/**/*',
      imgDst = './assets/images/';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./assets/javascript/lib.js','./assets/javascript/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/javascript/min'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  return gulp.src(['./assets/scss/main.scss',])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefix('last 2 version', '> 1%', 'ie 8'))
    .pipe(gulp.dest('./assets/css'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(minifyCSS())
    //.pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'compiled SCSS' }));
});



//Gulp watch directorys
gulp.task('watch', function () {
    gulp.watch('./assets/scss/*.scss', ['styles']);
    gulp.watch('./assets/javascript/*.js', ['scripts']);
});



// default gulp task

gulp.task('build', ['imagemin', 'scripts', 'styles']);

gulp.task('default', ['build', 'watch', 'connect-sync'], function() {});
