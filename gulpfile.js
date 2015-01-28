require('./gulp/configs');
var gulp = require('gulp'),
    fs = require('fs'),
    runseq = require('run-sequence');

var tasks = fs.readdirSync('./gulp/tasks');
tasks.forEach(function(task){
    require('./gulp/tasks/' + task);
});

gulp.task('build', function(){
    runseq('scripts', 'styles', 'static');
});

gulp.task('dev', function(){
    runseq('build', 'watch', 'serve');
});

gulp.task('deploy', function(){
    runseq('build', 'ghPush');
});
