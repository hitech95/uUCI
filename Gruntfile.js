module.exports = function (grunt) {

// -- Config -------------------------------------------------------------------

grunt.initConfig({

    pkg  : grunt.file.readJSON('./bower_components/purecss/package.json'),
    bower: grunt.file.readJSON('./bower_components/purecss/bower.json'),    

    // -- Clean Config ---------------------------------------------------------

    clean: {
        build    : ['build/'],
        dist	 : ['dist/assets/pure/*.css']
    },

    // -- Copy Config ----------------------------------------------------------

    copy: {
        build: {
            src    : './bower_components/purecss/src/**/css/*.css',
            dest   : 'build/',
            expand : true,
            flatten: true
        }
    },

    // -- Concat Config --------------------------------------------------------

    concat: {
        build: {
            files: [
                {'build/base.css': [
                    'bower_components/normalize-css/normalize.css',
                    'build/base.css'
                ]},

                {'build/buttons.css': [
                    'build/buttons-core.css',
                    'build/buttons.css'
                ]},

                {'build/forms-nr.css': [
                    'build/forms.css'
                ]},

                {'build/forms.css': [
                    'build/forms-nr.css',
                    'build/forms-r.css'
                ]},

                {'build/grids.css': [
                    'build/grids-core.css',
                    'build/grids-units.css'
                ]},

                {'build/menus.css': [
                    'build/menus-core.css',
                    'build/menus-horizontal.css',
                    'build/menus-dropdown.css',
                    'build/menus-scrollable.css',
                    'build/menus-skin.css',
                ]},

                // Rollups

                {'dist/assets/pure/<%= pkg.name %>.css': [
                    'build/base.css',
                    'build/grids.css',
                    'build/buttons.css',
                    'build/forms.css',
                    'build/menus.css',
                    'build/tables.css'
                ]}
            ]
        }
    },

    // -- CSSMin Config --------------------------------------------------------

    cssmin: {
        options: {
            noAdvanced: true
        },

        files: {
            expand: true,
            src   : 'dist/assets/pure/*.css',
            ext   : '.min.css'
        }
    },    

    // -- License Config -------------------------------------------------------

    license: {
        normalize: {
            options: {
                banner: [
                    '/*!',
                    'normalize.css v<%= bower.devDependencies["normalize-css"] %> | MIT License | git.io/normalize',
                    'Copyright (c) Nicolas Gallagher and Jonathan Neal',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            src   : ['dist/assets/pure/*.css']
        },

        yahoo: {
            options: {
                banner: [
                    '/*!',
                    'Pure v<%= pkg.version %>',
                    'Copyright 2014 Yahoo! Inc. All rights reserved.',
                    'Licensed under the BSD License.',
                    'https://github.com/yahoo/pure/blob/master/LICENSE.md',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            src   : ['dist/assets/pure/*.css']
        }
    },

    // -- Pure Grids Units Config ----------------------------------------------

    pure_grids: {
        default_units: {
            dest: 'build/grids-units.css',

            options: {
                units: [5, 24]
            }
        },

        responsive: {
            dest: 'build/grids-responsive.css',

            options: {
                mediaQueries: {
                    sm: 'screen and (min-width: 35.5em)',   // 568px
                    md: 'screen and (min-width: 48em)',     // 768px
                    lg: 'screen and (min-width: 64em)',     // 1024px
                    xl: 'screen and (min-width: 80em)'      // 1280px
                }
            }
        }
    },

    // -- Strip Media Queries Config -------------------------------------------

    stripmq: {
        all: {
            files: {
                //follows the pattern 'destination': ['source']
                'build/grids-responsive-old-ie.css':
                    ['build/grids-responsive.css']
            }
        }
    }    
});

// -- Main Tasks ---------------------------------------------------------------

// npm tasks.
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-pure-grids');
grunt.loadNpmTasks('grunt-stripmq');

// Local tasks.
grunt.loadTasks('./bower_components/purecss/tasks/');

grunt.registerTask('default', ['import', 'build']);
grunt.registerTask('import', ['bower_install']);
grunt.registerTask('build', [
    'clean:build',
	'clean:dist',
    'copy:build',
    'pure_grids',
    'stripmq',
    'concat:build',
    'clean:build',
    'cssmin',
    'license'
]);
};
