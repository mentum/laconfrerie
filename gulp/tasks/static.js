var gulp = require('gulp');

module.exports = gulp.task('static', function(){
	// assets
	gulp.src(configs.paths.images).pipe(gulp.dest(configs.paths.dest + 'img/'));
	gulp.src(configs.paths.fonts).pipe(gulp.dest(configs.paths.dest + 'fonts/'));
    // TODO: should be removed once the file is automaticly created in the push to GH pages task
    gulp.src(configs.paths.cname).pipe(gulp.dest(configs.paths.dest));

    // index
    gulp.src(configs.paths.index).pipe(gulp.dest(configs.paths.dest));
});
