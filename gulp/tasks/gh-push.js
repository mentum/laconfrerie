var gulp = require('gulp'),
	deploy = require('gulp-gh-pages');

gulp.task('ghPush', function () {
    //return gulp.src([configs.paths.cname, configs.paths.dest + '/**/*', configs.paths.index])
    // TODO : create a cname file using fs
    return gulp.src(configs.paths.dest)
        .pipe(deploy());
});
