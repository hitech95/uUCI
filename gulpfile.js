var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cssnano = require('gulp-cssnano'),
    concatCss = require('gulp-concat-css')
header = require('gulp-header');

var bower_components = "./bower_components/"

/* Normalize Stuff */
var normalize = {};
normalize.path = bower_components + "normalize-css/normalize.css";
normalize.pkg = require(bower_components + 'normalize-css/bower.json');
normalize.banner = [
    '/*!',
    'normalize.css v<%= pkg.version %> | MIT License | git.io/normalize',
    'Copyright (c) Nicolas Gallagher and Jonathan Neal',
    '*/\n'
].join('\n');

/* PureCSS Stuff */
var purecss = {};
purecss.path = bower_components + "purecss/src/**/css/*.css";
purecss.pkg = require(bower_components + 'purecss/package.json');
purecss.banner = [
    '/*!',
    'Pure v<%= pkg.version %>',
    'Copyright 2014 Yahoo! Inc. All rights reserved.',
    'Licensed under the BSD License.',
    'https://github.com/yahoo/pure/blob/master/LICENSE.md',
    '*/\n'
].join('\n');


var dist = "dist/";
var assets = dist + "assets/";

/* TODO */

gulp.task('build-pure', function () {
    gutil.log('Building PureCSS...')
    return gulp.src([normalize.path, purecss.path])
        .pipe(concatCss("pure/pure-min.css"))
        .pipe(header(normalize.banner, {pkg: normalize.pkg}))
        .pipe(header(purecss.banner, {pkg: purecss.pkg}))
        //.pipe(cssnano())
        .pipe(gulp.dest(assets));
});


gulp.task('default', ['help']);

gulp.task('help', function () {
    return gutil.log('Commands available: build, help, connect');
});