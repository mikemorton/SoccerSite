module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: true
      },
      build: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/*.js', 'build/*.js']
        }
      }
    },
    react: {
      single_file_output: {
        files: {
          'build/soccer.js': 'soccer.jsx'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');

  // Default task(s).
  grunt.registerTask('default', ['react', 'uglify' ]);

};
