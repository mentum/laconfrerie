var gulp = require('gulp'),
	connect = require('connect'),
	serveStatic = require('serve-static')

var staticServer = connect();

module.exports = gulp.task('serve', function (next) {
  staticServer.use(serveStatic(configs.paths.dest)).listen(configs.ports.staticServer, next);
});
