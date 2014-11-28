var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

module.exports = gulp.task('scripts', function () {
    gulp.src([configs.paths.scripts])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(configs.paths.dest + 'js/'));
});
