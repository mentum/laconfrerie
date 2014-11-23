var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    deploy = require('gulp-gh-pages'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var PATHS = {
    assets: 'assets/',
    styles: 'css/',
    javascripts: 'js/*.js',
    images: 'img/*',
    fonts: 'fonts/*',
    index: 'index.html',
    dist: 'dist/',
    cname: 'CNAME'
};

gulp.task('styles', function () {
    gulp.src([
            PATHS.assets + PATHS.styles + 'styles.less',
            PATHS.assets + PATHS.styles + 'bootstrap-less/bootstrap.less',
            PATHS.assets + PATHS.styles + '*.css'
    ])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest(PATHS.dist + 'css/'));

    gulp.src(PATHS.styles + '*.css')
        .pipe(gulp.dest(PATHS.dist + 'css/'));
});

gulp.task('views', function () {
    gulp.src(PATHS.index)
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('cname', function () {
    gulp.src(PATHS.cname)
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('scripts', function () {
    gulp.src([PATHS.assets + PATHS.javascripts])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(PATHS.dist + 'js/'));
});

gulp.task('images', function () {
    gulp.src(PATHS.assets + PATHS.images)
        .pipe(gulp.dest(PATHS.dist + 'img/'));
});

gulp.task('fonts', function () {
    gulp.src(PATHS.assets + PATHS.fonts)
        .pipe(gulp.dest(PATHS.dist + 'fonts/'));
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
    gulp.watch([PATHS.assets + PATHS.styles + '**/*.less'], ['styles']);
    gulp.watch(PATHS.index, ['views']);
    gulp.watch([PATHS.assets + PATHS.javascripts], ['scripts']);
});

gulp.task('dev', [
    'build',
    'watch'
]);

gulp.task('pushToGhPages', function () {
    //return gulp.src([PATHS.cname, PATHS.dist + '/**/*', PATHS.index])
    return gulp.src(PATHS.dist)
        .pipe(deploy());
});

gulp.task('deploy', [
    'build',
    'pushToGhPages'
]);
