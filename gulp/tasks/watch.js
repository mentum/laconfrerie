var gulp = require('gulp')
    livereload = require('gulp-livereload');

var livereloadServer = livereload(configs.ports.livereloadServer);

module.exports = gulp.task('watch', function () {
    gulp.watch([configs.paths.styles + '**/*.less'], ['styles']);
    gulp.watch(configs.paths.index, ['static']);
    gulp.watch([configs.paths.scripts], ['scripts']);

    gulp.watch(configs.paths.dest + '**/*').on('change', function (file) {
        livereloadServer.changed(file.path);
    });
});
