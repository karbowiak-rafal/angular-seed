module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var getDestDirectoryName = function() {
        return (new Date()).toLocaleDateString();
    };

    grunt.initConfig({

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },

        clean: {
            deploy: {
                options: { force: true },
                src: ['/temp/' + getDestDirectoryName() + '/**']
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['app/**'], dest: '/temp/' + getDestDirectoryName()},

                    //copy right config file to the destination directory...
                    {src: 'app/index2.html', dest: '/temp/' + getDestDirectoryName() + '/app/index.html',
                        filter: 'isFile'}

                    // // includes files within path and its sub-directories
                    // {expand: true, src: ['path/**'], dest: 'dest/'},

                    // // makes all src relative to cwd
                    // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
                ]
            }
        },

        connect: {
            server: {
                options: {
                    keepalive: false,
                    port: 8101,
                    base: {
                        path: 'app',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                    // ,
                    // onCreateServer: function(server, connect, options) {
                    //     var io = require('socket.io').listen(server);
                    //     io.sockets.on('connection', function(socket) {
                    //         // do something with socket
                    //     });
                    // }
                }
            }
        },

        protractor: {
            options: {
                configFile: "e2e-tests/protractor.conf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            all: {}
            // your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
            //     options: {
            //         configFile: "e2e.conf.js", // Target-specific config file
            //         args: {} // Target-specific arguments
            //     }
            // },
        },

        print: {
            target1: ['index.html', 'src/styles.css', 2],
            target2: (new Date()).toLocaleDateString(),
            hello: 'world'
        }

    });

    grunt.registerTask('world', 'default task description', function(){
        console.log('hello world');
    });

    grunt.registerTask('hello', 'say hello', function(name){
        if(!name || !name.length)
            grunt.warn('you need to provide a name.');

        console.log('hello ' + name);
    });

    grunt.registerTask('default', ['world', 'hello:tom']);

    grunt.registerMultiTask('print', 'print targets', function() {
        grunt.log.writeln(this.target + ': ' + this.data);
    });

    grunt.registerTask('test', ['connect', 'protractor', 'print']);

};

//var grunt = require('grunt');
