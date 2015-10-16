"use strict";

var gulp = require('gulp'); 
var notify = require('gulp-notify');
var header = require('gulp-header');
var filesize = require('gulp-filesize');
var gutil = require('gulp-util');

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


var pkg = require('./package.json');
var banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

var jsSrc = './assets/javascript/*.js',
	jsLib  = './assets/javascript/lib.js',
	jsDst = './assets/javascript/min';
var cssSrc = './assets/scss/main.scss',
	cssDst = './assets/css';
var imgSrc = 'content/**/*{gif,ico,jpg,png,svg}',
	imgDst = 'content/';
var assetimgSrc = './assets/images/src/**/*',
	assetimgDst = './assets/images/';



// JS concat, strip debugging and minify
gulp.task('scripts', function() {
	gulp.src([jsLib, jsSrc])
	.pipe(concat('script.js'))
	.pipe(stripDebug())
	// .pipe(uglify())
	.pipe(gulp.dest(jsDst))
	.pipe(filesize())
	.on('error', gutil.log);

	gutil.log(
		gutil.colors.yellow(jsLib), 
		gutil.colors.gray('concat with'), 
		gutil.colors.yellow(jsSrc, '->', jsDst), 
		gutil.colors.gray('(strip debugging and uglify)'));
});

// CSS concat, auto-prefix and reload
gulp.task('styles', function() {
	gutil.log(
		gutil.colors.yellow(cssSrc, '->', cssDst, 'main.css'), 
		gutil.colors.gray('(Sass, auto-prefix, inline-sourcemap and reload)'));

	return gulp.src([cssSrc])
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(autoprefix('last 2 version', '> 1%', 'ie 8'))
	.pipe(header("\n/* This file is generated — do NOT edit by hand! */\n\n"))
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest(cssDst))
	//.pipe(rename({suffix: '.min'}))
	//.pipe(minifyCSS())
	//.pipe(gulp.dest(cssDst))
	.pipe(browserSync.stream())
	.pipe(notify({ message: 'compiled SCSS' }));
});

// minify all images in /content
gulp.task('images', function () {
	gutil.log(
		gutil.colors.yellow(imgSrc, '->', imgDst, 'main.css'), 
		gutil.colors.gray('(minify)'));

	return gulp.src(imgSrc)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
	}))
	.pipe(gulp.dest(imgDst));
});
// minify images in assets (without overwriting them)
gulp.task('assetimage', function() {
	gulp.src(assetimgSrc)
	.pipe(changed(imgDst))
	.pipe(imagemin())
	.pipe(gulp.dest(assetimgDst));

	gutil.log(
		gutil.colors.yellow(assetimgSrc, '->', assetimgDst, 'main.css'), 
		gutil.colors.gray('(minify)'));

});

// CSS concat, auto-prefix and minify
gulp.task('stylesDeploy', function() {
	gulp.src([cssSrc])
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefix('last 2 version', '> 1%', 'ie 8'))
	.pipe(minifyCSS())
	.pipe(header("/* This file is minified — do NOT edit by hand! */\n"))
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest(cssDst))
	.pipe(filesize());
	gutil.log(
		gutil.colors.yellow(cssSrc, '->', cssDst, 'main.css'), 
		gutil.colors.gray('(CSS concat, auto-prefix and minify)'));

});

gulp.task('critical', function() {
	return gulp.src(['./assets/scss/critical/critical.scss'])
	.pipe(concat('critical.css'))
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefix('last 2 version', '> 1%', 'ie 8'))
	.pipe(minifyCSS())
	.pipe(header("/* Critical inline-Styles (above the fold) — do NOT edit by hand! */\n"))
	.pipe(gulp.dest('./assets/css/'))


});




//Gulp watch directorys
gulp.task('watch', function () {
	gulp.watch('./assets/scss/*.scss', ['styles']);
	gulp.watch('./assets/javascript/*.js', ['scripts']);
	gulp.watch('./assets/images/src/**/*', ['assetimage']);
	gulp.watch('./assets/scss/critical/*.scss', ['critical']);
});



// default gulp task

gulp.task('build', ['scripts', 'styles', 'assetimage', 'critical']);

gulp.task('default', ['build', 'watch',], function() {});

gulp.task('deploy', ['scripts', 'assetimage', 'images', 'stylesDeploy', 'critical']);
