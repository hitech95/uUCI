var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cssnano = require('gulp-cssnano'),
    concatCss = require('gulp-concat-css')
	header = require('gulp-header');
	
// Add all the gruntfile tasks to gulp 
require('gulp-grunt')(gulp);

var bower_components = "./bower_components/"

/* TODO */

gulp.task('build-pure', function () {
	gutil.log('Building PureCSS using Grunt...')
    gulp.start('grunt-build-purecss');
});


gulp.task('default', ['help']);

gulp.task('help', function () {
    return gutil.log('Commands available: build, help, connect');
});