/*
 * grunt-versioning
 * https://github.com/deej/grunt-versioning
 *
 * Copyright (c) 2015 DeeJRoth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
    },

    // Configuration to be run (and then tested).
    versioning: {
      options: {
        releaseType: 'alpha'
      },
      default:{
        options: {
          releaseType: ''
        }
      },
      major: {
        options: {
          major: true,
          dry: false
        }
      },
      minor: {
        options: {
          minor: true,
          dry: false
        }
      },
      patch:{
        options: {
          patch: true,
          dry: false
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['versioning:default']);
  grunt.registerTask('major-test', ['versioning:major']);
  grunt.registerTask('minor-test', ['versioning:minor']);
  grunt.registerTask('patch-test', ['versioning:patch']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
