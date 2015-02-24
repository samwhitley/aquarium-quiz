'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      js : {
        files: "dev/scripts/*.js",
        tasks: "uglify"
      }
    },
    uglify: {
      dev: {
        files: [
          {
            src: ['dev/scripts/resources.js', 'dev/scripts/sprite.js', 'dev/scripts/main.js', 'dev/scripts/input.js', 'dev/scripts/utils.js', 'dev/scripts/fishScreen.js', 'dev/scripts/titleScreen.js', 'dev/scripts/menuScreen.js', 'dev/scripts/questionScreen.js', 'dev/scripts/resultScreen.js'],
            dest: 'build/scripts/min.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify', 'watch']);
};