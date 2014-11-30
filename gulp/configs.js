SOURCES_DIR = 'src/';

global.configs = {
	paths: {
		index: SOURCES_DIR + 'index.html',
		images: SOURCES_DIR + 'assets/img/**/*',
		fonts: SOURCES_DIR + 'assets/fonts/**/*',
		scripts: SOURCES_DIR + 'js/**/*.js',
		styles: SOURCES_DIR + 'styles/',
		cname : 'CNAME',
		dest: 'dist/'
	},
	ports : {
		staticServer : 5555,
		livereloadServer: 35729
	}
}
