var gulp = require('gulp');

module.exports = gulp.task('watch', function () {
    gulp.watch([configs.paths.styles + '**/*.less'], ['styles']);
    gulp.watch(configs.paths.index, ['static']);
    gulp.watch([configs.paths.scripts], ['scripts']);
});
