// Gruntfile.js

var start = require('./src/task/server.js');

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

  var server = null;

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    
    env: {
      options: {
        //Shared Options Hash 
      },
      dev: {
        PORT: 6002
      },
      build: {
      }
    },
	
    // configure uglify to minify js files -------------------------------------
    //Banner: his will add a nice comment to the top of our minified file
    uglify: {
      my_target: {
        files: {
          'dist/output.min.js': ['!src/node_modules', 'src/bll/*.js', 'src/controllers/*.js', 'src/database/*.js', 'src/routers/*.js', 'app.js']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file 
          quiet: false, // Optionally suppress output to standard out (defaults to false) 
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
        },
        src: ['src/test/api_cv_spec.js']
      }
    },

    express: {

      dev: {
        options: {
          script: 'src/app.js'
        }
      }
    },

    gitcheckout: {
      task: {
        options: {
          branch: 'tested',
          overwrite: true
        }
      }
    },
    gitadd: {
      task: {
        options: {
          all: true
        }
      }
    },

    gitcommit: {
      task: {
        options: {
          message: 'Test passed',
          branch: 'tested'
        }
      }
    },

    gitpull: {
      task: {
        options: {
          remote: 'origin',
          branch: 'tested'
        }
      }
    },

    gitpush: {
      task: {
        options: {
          remote: 'origin',
          branch: 'tested'
        }
      }
    }



  });
 
  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-env');
  
  //grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Planification tasks: first uglify, then mochaTest

  grunt.registerTask('default', ['env:dev','express', 'mochaTest']);

};