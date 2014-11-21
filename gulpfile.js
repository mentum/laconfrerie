var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    deploy = require('gulp-gh-pages');

var PATHS = {
    assets: 'assets/',
    styles: 'css/',
    javascripts: 'js/*.js',
    images: 'img/*',
    fonts: 'fonts/*',
    index: 'index.html',
    dist: 'dist/'
};

gulp.task('styles', function() {
    gulp.src([
        PATHS.assets + PATHS.styles + 'styles.less',
        PATHS.assets + PATHS.styles + 'bootstrap-less/bootstrap.less',
        PATHS.assets + PATHS.styles + '*.css'
    ])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest(PATHS.dist + PATHS.assets + 'css/'));

    gulp.src(PATHS.styles + '*.css')
        .pipe(gulp.dest(PATHS.dist + PATHS.assets + 'css/'));
});

gulp.task('views', function () {
    gulp.src(PATHS.index)
        .pipe(gulp.dest(PATHS.dist));
});


gulp.task('scripts', function () {
    gulp.src([PATHS.assets + PATHS.javascripts])
        .pipe(gulp.dest(PATHS.dist + PATHS.assets + 'js/'));
});

gulp.task('images', function () {
    gulp.src(PATHS.assets + PATHS.images)
        .pipe(gulp.dest(PATHS.dist + PATHS.assets + 'img/'));
});

gulp.task('fonts', function () {
    gulp.src(PATHS.assets + PATHS.fonts)
        .pipe(gulp.dest(PATHS.dist + PATHS.assets + 'fonts/'));
});

gulp.task('build', [
    'scripts',
    'views',
    'styles',
    'images',
    'fonts'
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

gulp.task('deploy', ['build'],  function () {
    return gulp.src(PATHS.dist + '/**/*')
        .pipe(deploy());
});
