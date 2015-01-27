var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

module.exports = gulp.task('styles', function () {
    gulp.src([
        configs.paths.styles + 'styles.less',
        configs.paths.styles + 'snipcart.less',
        configs.paths.styles + 'bootstrap-less/bootstrap.less',
        configs.paths.styles + '*.css'
    ])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['IE >= 8', 'last 6 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(configs.paths.dest + 'css/'));

    gulp.src(configs.paths.styles + '*.css')
        .pipe(gulp.dest(configs.paths.dest + 'css/'));
});
