/**
 * Created by danielsilhavy on 23.08.16.
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['public/js/App.js','public/js/handler/*.js','public/js/constants/*.js','public/js/utils/*.js', 'public/js/view/global/*.js', 'public/js/view/MainView.js','public/js/view/*.js','public/js/model/LoginModel.js','public/js/model/MainModel.js','public/js/model/*.js','public/js/controller/MainController.js','public/js/controller/*.js','public/js/router/*.js '],
                dest: 'public/dist/concat.js'
            }
        },
        uglify: {
            files: {
                src: ['public/dist/concat.js'],  // source files mask
                dest: 'public/dist/app.min.js',    // destination folder
                flatten: true,   // remove all unnecessary nesting
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};