var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css');

module.exports = gulp.task('styles', function () {
    gulp.src([
        configs.paths.styles + 'styles.less',
        configs.paths.styles + 'bootstrap-less/bootstrap.less',
        configs.paths.styles + '*.css'
    ])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest(configs.paths.dest + 'css/'));

    gulp.src(configs.paths.styles + '*.css')
        .pipe(gulp.dest(configs.paths.dest + 'css/'));
});
