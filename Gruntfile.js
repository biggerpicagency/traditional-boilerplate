(function () {

    'use strict';

    module.exports = function(grunt) {
        require('time-grunt')(grunt);
        grunt.initConfig();

        (function initGruntConfig(){

            // Custom project config
            // Values are accessible through:
            // - Grunt templates, eg: '<%= projectConfig.liveReloadPath %>'
            // - Grunt API, eg: grunt.config.get('projectConfig').liveReloadPath
            grunt.config.set('projectConfig', grunt.file.readJSON('./app.config.json'));

            // Environment choice is passed through CLI (`grunt --env=production`).
            // Default environment is 'dev', which should be the first of definied environments
            grunt.config.set('envId', grunt.option('env') || Object.keys(grunt.config.get('projectConfig').envs)[0]);
            grunt.log.writeln('Environment id: ', grunt.config.get('envId'));

            // 'currEnvConfig' - helper var for better readibility in tasks
            grunt.config.set('currEnvConfig', grunt.config.get('projectConfig').envs[grunt.config.get('envId')]);
            grunt.config.set('frameworkRoot', './public');

            (function generateJsMarkup() {
                var JSheadOutputList = [],
                    JSbodyOutputList = [];

                if(grunt.config.get('envId') === 'dev') {
                    JSheadOutputList = [
                        'head'
                    ];

                    JSbodyOutputList = [
                        'liveReload',
                        'body'
                    ];
                }
                else if(grunt.config.get('envId') === 'local' || grunt.config.get('envId') === 'staging' || grunt.config.get('envId') === 'production') {
                    JSheadOutputList = [
                        'headJsMin'
                    ];

                    JSbodyOutputList = [
                        'bodyJsMin'
                    ];
                }
                else {
                    grunt.log.error('refreshBodyEndJsMarkup() failed to recognize envId: ' + envId);
                }
                
                grunt.config.set('JSheadMarkup', generateListOfJS(JSheadOutputList, {returnAsMarkup: true}));
                grunt.config.set('JSbodyMarkup', generateListOfJS(JSbodyOutputList, {returnAsMarkup: true}));
                grunt.config.set('isFramework', isFrameworkInstalled());
            })();

        })();

        // Helper function that check if the public/ directory exists
        // it says if the Laravel app is installed or not.
        function isFrameworkInstalled() {
            //return grunt.file.exists('./public/index.php') ? true : false;
            return false;
        }

        // Helper funtion which generates list of JS scripts
        // based on javascripts.config.json and blocks of inline code defined inside this function.
        // Example: generateListOfJS(['head', 'body'], {returnAsMarkup: true});
        function generateListOfJS(typesFilter, options) {
            var scriptsConfig = grunt.file.readJSON(grunt.config.get('projectConfig').scriptsConfigPath);
            var appScriptsBasePath = '';
            var scriptsCategorized = {};
            var inlineCodeBlocks = {};
            var outputScripts = [];
            options = options || {};

            // Adding base path is required when list is returned for a task (eg. uglify) rather than for index.html
            if(typeof options.globalBasePath === 'string'){
                appScriptsBasePath = options.globalBasePath + '/';
                // note: compiled templates are not subject to prefixing with base path
            }

            typesFilter = typesFilter || [];

            // Build lists, append base path
            // Vendor
            scriptsCategorized.vendor = (function() {
                var fromHead = getScripts(scriptsConfig.head);
                var fromBody = getScripts(scriptsConfig.body);

                return fromHead.concat(fromBody);
            })();

            // JS code in head section
            scriptsCategorized.head = getScripts(scriptsConfig.head);

            // JS code in body section
            scriptsCategorized.body = getScripts(scriptsConfig.body);

            // Generate inline code blocks
            inlineCodeBlocks.liveReload = {type: 'code', value: '<script src="<%= projectConfig.liveReloadPath %>"></script>'};
            inlineCodeBlocks.headJsMin = {type: 'code', value: '<script src="js/initial.min.js"></script>'};
            inlineCodeBlocks.bodyJsMin = {type: 'code', value: '<script src="js/main.min.js"></script>'};

            // Types should be implicitely given
            if (!typesFilter.length) {
                grunt.log.warn('typesFilter in generateListOfJS() is empty. Returning an empty list.');
            }

            // Build list of scripts in the order given by filter
            else {
                typesFilter.forEach(function(type){
                    if(scriptsCategorized.hasOwnProperty(type)) {
                        outputScripts = outputScripts.concat(scriptsCategorized[type]);
                    }
                    else if(inlineCodeBlocks.hasOwnProperty(type)){
                        outputScripts = outputScripts.concat(inlineCodeBlocks[type]);
                    }
                    else {
                        grunt.log.error('generateListOfJS() is skipping scripts of "' + type +'" type, which was not recognized.');
                    }
                });
            }

            return formatOutput(outputScripts);

            // Convert to string of <script> tags when necessary
            function formatOutput(items) {
                // Convert each item in array to its output format
                items = items.map(function(item){
                    if (item.type === 'path') {
                        var src = item.value.substring(0, 3) === 'src' ? item.value.substring(4, item.value.length) : item.value;
                        return options.returnAsMarkup === true ? '<script src="' + src + '"></script>' : item.value;
                    }
                    else if (item.type === 'code'){
                        return item.value;
                    }

                    grunt.log.error('formatOutput() failed to parse item: ' + JSON.stringify(item));
                    return '';
                });

                // Convert array to its output format
                if (options.returnAsMarkup === true) {
                    items = items.join('\r\n');
                }

                return items;
            }

            function getScripts(files) {
                var output = files.map(function(filePath) {
                    return {type: 'path', value: filePath};
                });

                return output;
            }
        }


    ////////////////////////////////////////////////////////////////////////////
    // Tasks definitions
    ////////////////////////////////////////////////////////////////////////////

        // JS linting
        // https://www.npmjs.com/package/grunt-contrib-jshint
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.config('jshint', {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: ['Gruntfile.js']
            },
            app: {
                src: [
                    '<%= projectConfig.srcDir %>/js/**/*.js'
                ]
            },
            unittests: {
                src: [
                    //'<%= projectConfig.srcDir %>/test/**/*.js' // TODO uncomment when jshint errors are fixed in the boilerplate
                ]
            }
        });

        // Sass file compilation and compression
        // https://www.npmjs.com/package/grunt-sass
        // https://github.com/sass/node-sass#options
        grunt.loadNpmTasks('grunt-sass');
        grunt.config('sass', {
            options: {
                precision: 2,
                sourceMap: true,
                outFile: '<%= currEnvConfig.destDir %>/css'
            },
            dev: {
                options: {
                    outputStyle: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>/scss',
                    src: ['*.scss'],
                    dest: '<%= currEnvConfig.destDir %>/css',
                    ext: '.css'
                }]
            },
            nondev: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>/scss',
                    src: ['*.scss'],
                    dest: '<%= currEnvConfig.destDir %>/css',
                    ext: '.css'
                }]
            }
        });

        // Adding autoprefixes to CSS files
        // https://www.npmjs.com/package/grunt-autoprefixer
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.config('autoprefixer', {
            options: {
                browsers: ['last 2 versions'],
                map: true
            },
            dist: {
                src: '<%= currEnvConfig.destDir %>/css/*.css'
            }
        });

        // Deleting outdated files
        // https://www.npmjs.com/package/grunt-contrib-clean
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.config('clean', {
            all: (function() {
                var paths = ['<%= currEnvConfig.destDir %>/**/*'];

                if (isFrameworkInstalled()) {
                    paths = paths.concat([
                        '<%= frameworkRoot %>/css/*',
                        '<%= frameworkRoot %>/js/**/*',
                        '<%= frameworkRoot %>/img/**/*'
                    ]);
                }

                return paths;
            })(),
            js: [
                '<%= currEnvConfig.destDir %>/js'
            ],
            css: [
                '<%= currEnvConfig.destDir %>/css'
            ],
            destTemp: [
                '<%= currEnvConfig.destDir %>/<%= projectConfig.tempDir %>'
            ],
            initialFiles: [
                '<%= currEnvConfig.destDir %>/js/**/initial.js'
            ]
        });

        // Replace '@@JSbody' tag with list of JS dependencies generated by generateListOfJS()
        // https://www.npmjs.com/package/grunt-replace
        grunt.loadNpmTasks('grunt-replace');
        grunt.config('replace', {
            dist: {
                options: {
                    patterns: (function() {
                        var replacements = [];
                        var jsHead = generateListOfJS(['head'], {globalBasePath: 'src'});

                        replacements.push({
                            match: 'JShead',
                            replacement: jsHead.length > 0 ? '<%= JSheadMarkup %>\r\n' : ''
                        });

                        replacements.push({
                            match: 'JSbody',
                            replacement: '<%= JSbodyMarkup %>\r\n'
                        });

                        replacements.push({
                            match: 'metaNoIndex',
                            replacement: (grunt.config.get('envId') === 'dev' || grunt.config.get('envId') === 'local' || grunt.config.get('envId') === 'staging') ? '<meta name="robots" content="noindex,nofollow">' : ''
                        });

                        return replacements;
                    })()
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= projectConfig.srcDir %>/*.html'],
                    dest: '<%= currEnvConfig.destDir %>'
                }]
            }
        });

        // JS file obfuscation
        // https://www.npmjs.com/package/grunt-contrib-uglify
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.config('uglify', {
            options: {
                mangle: {
                    except: ['angular']
                },
                screwIE8: true,
                sourceMap: true
            },
            jsHead: {
                src: generateListOfJS(['head'], {globalBasePath: 'src'}),
                dest: '<%= currEnvConfig.destDir %>/js/initial.min.js'
            },
            jsBody: {
                src: generateListOfJS(['body'], {globalBasePath: 'src'}),
                dest: '<%= currEnvConfig.destDir %>/js/main.min.js'
            }
        });

        // Copy files from source dir to build dir. Used when no JS uglyfying is applied.
        // https://www.npmjs.com/package/grunt-contrib-copy
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.config('copy', {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>/js',
                    src: ['**'],
                    dest: '<%= currEnvConfig.destDir %>/js'
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    src: generateListOfJS(['vendor']),
                    dest: '<%= currEnvConfig.destDir %>'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>/img',
                    src: ['**/*'],
                    dest: '<%= currEnvConfig.destDir %>/img'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>/fonts',
                    src: ['**/*'],
                    dest: '<%= currEnvConfig.destDir %>/fonts'
                }]
            },
            other: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>',
                    src: '<%= projectConfig.customAssetsToCopy %>',
                    dest: '<%= currEnvConfig.destDir %>'
                }]
            },
            srcForMaps: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.srcDir %>',
                    src: ['scss/**/*', 'js/**/*'],
                    dest: '<%= currEnvConfig.destDir %>/src'
                }]
            },
            cssToPublic: {
                files: [{
                    expand: true,
                    cwd: '<%= currEnvConfig.destDir %>/css',
                    src: ['**'],
                    dest: '<%= frameworkRoot %>/css'
                }]
            },
            jsToPublic: {
                files: [{
                    expand: true,
                    cwd: '<%= currEnvConfig.destDir %>/js',
                    src: ['**/*'],
                    dest: '<%= frameworkRoot %>/js'
                }]
            },
            imgToPublic: {
                files: [{
                    expand: true,
                    cwd: '<%= currEnvConfig.destDir %>/img',
                    src: ['**/*'],
                    dest: '<%= frameworkRoot %>/img'
                }]
            }
        });

        // Automatically run tasks when watched files are being modified
        // https://www.npmjs.com/package/grunt-contrib-watch
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-newer');
        grunt.config('watch', {
            options: {
                spawn: false,
                livereload: true,
                atBegin: false
            },
            fileDeleted: {
                files:  ['<%= projectConfig.srcDir %>/**/*'],
                tasks:  ['fileDeletedWarning'],
                options: {
                    event: ['deleted']
                }
            },
            sass: {
                files:  ['<%= projectConfig.srcDir %>/scss/**/*.scss'],
                tasks:  (function(){
                    if(grunt.config.get('envId') === 'dev') {
                        var tasks = [
                            'sass:dev',
                            'autoprefixer',
                            'copy:srcForMaps'
                        ];

                        if (isFrameworkInstalled()) {
                            tasks.push('copy:cssToPublic');
                        }

                        return tasks;
                    }
                    else {
                        return [
                            'sass:nondev',
                            'autoprefixer'
                        ];
                    }
                })()
            },
            html: {
                files: ['<%= projectConfig.srcDir %>/*.html'],
                tasks: ['replace'],
                options: {
                    event: ['changed', 'added']
                }
            },
            js: {
                files: ['<%= projectConfig.srcDir %>/js/**/*.js'],
                tasks: (function(){
                    if(grunt.config.get('envId') === 'dev'){
                        var tasks = [
                            'newer:jshint:app',
                            'copy:js'
                        ];

                        if (isFrameworkInstalled()) {
                            tasks.push('copy:jsToPublic');
                        }

                        return tasks;
                    }
                    else {
                        return [
                            'newer:jshint:app',
                            'uglify',
                            'clean:destTemp'
                        ];
                    }
                })(),
                options: {
                    event: ['changed']
                }
            },
            img: {
                files: ['<%= projectConfig.srcDir %>/img/**/*'],
                tasks: (function() {
                    var tasks = ['newer:copy:img'];

                    if (isFrameworkInstalled()) {
                        tasks.push('newer:copy:imgToPublic');
                    }

                    return tasks;
                })(),
                options: {
                    event: ['changed', 'added']
                }
            },
            fonts: {
                files: ['<%= projectConfig.srcDir %>/fonts/**/*'],
                tasks: ['newer:copy:fonts'],
                options: {
                    event: ['changed', 'added']
                }
            },
            other: {
                files: grunt.config.get('projectConfig').customAssetsToCopy.map(function(item){
                    return grunt.config.get('projectConfig').srcDir + '/' + item;
                }),
                tasks: ['newer:copy:other'],
                options: {
                    event: ['changed', 'added']
                }
            },
            scriptsConfig: {
                files: [grunt.config.get('projectConfig').scriptsConfigPath],
                tasks: ['askForRestart'],

                options: {
                    event: ['changed']
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile', 'askForRestart']
            }
        });

        // Static web server only for frontend purposes
        // 
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.config('connect', {
            server: {
                options: {
                    port: 9001,
                    base: 'build'
                }
            }
        });

    ////////////////////////////////////////////////////////////////////////////
    // Custom Tasks definitions
    ////////////////////////////////////////////////////////////////////////////

        // Displaying log message.
        // Although watch sees changes in Gruntfile.js and runs jshint the new config is not automatically applied.
        grunt.registerTask('askForRestart', function () {
            grunt.log.error('#############################################################################');
            grunt.log.error('Detected changes require performing a full rebuild.');
            grunt.log.error('Press \'ctrl-c\' keys and run Grunt again.');
            grunt.log.error('#############################################################################');
        });

        // Displaying log message.
        grunt.registerTask('fileDeletedWarning', function (action, filepath, target) {
            grunt.log.warn('#############################################################################');
            grunt.log.warn('A file was deleted. Deleting files are mostly not supported.');
            grunt.log.warn('Restart Grunt to make sure that the file was deleted in build directory.');
            grunt.log.warn('#############################################################################');
        });

        // Just prettyfying console output
        grunt.event.on('watch', function(action, filepath, target) {
            grunt.log.subhead('===============================================================================\nRunning watch:' + target);
        });

        // When no CLI options are passed, the 'build' action is called
        grunt.registerTask('default', function () {
            grunt.task.run('build');
        });

        // The main, default build task. Target environment is definied through CLI: 'grunt --env=staging'
        grunt.registerTask('build', function() {
            var tasks = [];

            grunt.log.subhead('#############################################################################');
            grunt.log.subhead(' Assets files to edit are located at: /' + grunt.config.get('projectConfig').srcDir);
            grunt.log.subhead('#############################################################################');

            if(grunt.config.get('envId') === 'dev') {
                grunt.file.write('./build.status.json', JSON.stringify({"build": false}));

                tasks = [
                    'jshint', // initial validation
                    'clean:all', // Deleting old content in dest directory
                    'sass:dev', 'autoprefixer', // CSS processing
                    'replace', // Replacing @@ tags in .html files (embedding JS scripts etc.)
                    'copy:vendor', 'copy:js', // copying JS files "as is"
                    'copy:img', 'copy:fonts', 'copy:other', // copying assets files "as is"
                    'copy:srcForMaps', // to enable preview of source JS and SCSS files in Chrome
                    'clean:destTemp',
                    'connect'
                ];

                if (grunt.config.get('isFramework')) {
                    tasks = tasks.concat([
                        'copy:cssToPublic',
                        'copy:jsToPublic',
                        'copy:imgToPublic'
                    ]);
                }

                tasks.push('watch');
            }
            else if(grunt.config.get('envId') === 'local' || grunt.config.get('envId') === 'staging' || grunt.config.get('envId') === 'production') {
                grunt.file.write('./build.status.json', JSON.stringify({"build": true}));

                tasks = [
                    'jshint', // initial validation
                    'clean:all', // Deleting old content in dest directory
                    'sass:nondev', 'autoprefixer', // CSS processing
                    'replace', // Replacing @@ tags in .html files
                    'uglify', // concatenating, minifying, mangling all JS files
                    'copy:img', 'copy:fonts', 'copy:other', // copying assets "as is"
                    'clean:destTemp' // deleting temporary files required for build process only
                ];
            }

            grunt.task.run(tasks);
        });
    };
}());