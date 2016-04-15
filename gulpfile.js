'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('default', () => {
  return gulp.src(['./**'])
  	.pipe(zip('Archive.zip'))
  	.pipe(gulp.dest('./'));
});
