var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify');

module.exports = gulp.task('scripts', function () {
    gulp.src([configs.paths.scriptsEntryPoint])
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(configs.paths.dest + 'js/'));
});
