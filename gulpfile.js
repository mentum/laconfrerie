require('./gulp/configs');

var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    deploy = require('gulp-gh-pages'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('styles', function () {
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

gulp.task('views', function () {
    gulp.src(configs.paths.index)
        .pipe(gulp.dest(configs.paths.dest));
});

gulp.task('cname', function () {
    gulp.src(configs.paths.cname)
        .pipe(gulp.dest(configs.paths.dest));
});

gulp.task('scripts', function () {
    gulp.src([configs.paths.scripts])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(configs.paths.dest + 'js/'));
});

gulp.task('images', function () {
    gulp.src(configs.paths.images)
        .pipe(gulp.dest(configs.paths.dest + 'img/'));
});

gulp.task('fonts', function () {
    gulp.src(configs.paths.fonts)
        .pipe(gulp.dest(configs.paths.dest + 'fonts/'));
});

gulp.task('build', [
    'scripts',
    'views',
    'styles',
    'images',
    'fonts',
    'cname'
]);

gulp.task('watch', function () {
    gulp.watch([configs.paths.styles + '**/*.less'], ['styles']);
    gulp.watch(configs.paths.index, ['views']);
    gulp.watch([configs.paths.scripts], ['scripts']);
});

gulp.task('dev', [
    'build',
    'watch'
]);

gulp.task('pushToGhPages', function () {
    //return gulp.src([configs.paths.cname, configs.paths.dest + '/**/*', configs.paths.index])
    // TODO : create a cname file from configs
    return gulp.src(configs.paths.dest)
        .pipe(deploy());
});

gulp.task('deploy', [
    'build',
    'pushToGhPages'
]);
