module.exports = function(grunt) {
    
    grunt.initConfig({
       myMultiTask: {
        target1: {
            src: '*.js',
            dest: 'temp.temp'
           
        }
       }
    });
    
    grunt.registerMultiTask('myMultiTask', function() {
        console.log(this.options());
        console.log(grunt.config('myTask.foo'));
        console.log(grunt.task);
        console.log(this);
        console.log(this.files.length);
        this.files.forEach(function(file) {
            console.log("source: " + file.src + "->" + file.dest);
        });
    });
}