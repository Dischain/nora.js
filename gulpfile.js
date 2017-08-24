'use strict';

const gulp       = require('gulp'),
      browserify = require('browserify'),
      babelify   = require('babelify'),
      source     = require('vinyl-source-stream');

gulp.task('scripts-browserify', () => {
  return browserify('./index.js')
         .transform(babelify)
         .bundle()
         .pipe(source('./nora.js'))
         .pipe(gulp.dest('./'));
});