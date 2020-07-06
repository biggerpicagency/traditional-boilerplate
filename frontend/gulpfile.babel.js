/**
 *
 *  Based on Google Web Starter Kit
 *  Improved by Studio Sidekicks
 *  (c) 2019 https://www.studiosidekicks.com
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/en/learn

// Build setting
const HTML_BUILD = 'default'; // options: default OR minified

const { watch, series, parallel, task, src, dest } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const path = require('path');
const del = require('del');
const browserSync = require('browser-sync');
const swPrecache = require('sw-precache');
const gulpLoadPlugins = require('gulp-load-plugins');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');
const replace = require('gulp-replace');
const include = require('gulp-file-include');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 11',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
const $ = gulpLoadPlugins();
const server = browserSync.create();
const stylish = require('jshint-stylish');

const lazyLoadScript = String.raw`
<script>
  (function (w, d) {
    w.addEventListener('LazyLoad::Initialized', function (e) {
      w.lazyLoadInstance = e.detail.instance;
    }, false);
    var b = d.getElementsByTagName('head')[0];
    var s = d.createElement("script"); s.async = true;
    var v = !("IntersectionObserver" in w) ? "lazyloadPolyfill.js" : "lazyloadIntersectionObserver.js";
    s.src = "/scripts/" + v;
    w.lazyLoadOptions = {
      elements_selector: ".lazy",
      threshold: 0,
      callback_enter: function(element) {
        /* for elements that have lazy loaded background image with media queries */
        var css = element.getAttribute('data-style');

        if (css) {
            css = css.replace(/(\r\n|\n|\r)/gm, "");

            var style = document.createElement('style');
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(style);

            style.setAttribute("type", "text/css");

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                var styleText = document.createTextNode(css);
                style.appendChild(styleText);
            }

        }
      }
    };
    b.appendChild(s);
  }(window, document));
</script>`.replace(/\s+/g, ' ').trim(); // remove whitespaces, new lines etc. in the code above

function serve(done) {
  server.init({
    open: false,
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'BP',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // server: ['.tmp', 'app'],
    server: ['.tmp'],
    port: 3000
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

// scripts (using Webpack) - for developing
task('scripts:dev', (cb) => {
  let streamMode = require('./webpack/config.development.js');

  src(['./app/scripts/**/*.js'])
    .pipe(webpackStream(streamMode, webpack))
    //.pipe($.babel())
    .pipe(dest('.tmp/scripts'));
  cb();
});

// scripts (using Webpack) - build
task('scripts:build', (cb) => {
  let streamMode = require('./webpack/config.production.js');

  src(['./app/scripts/**/*.js'])
    .pipe(webpackStream(streamMode, webpack))
    .pipe($.babel())
    .pipe(dest('.tmp/scripts'))
    .pipe(replace(/('|")use strict\1/g, ';'))
    .pipe($.uglify({
      mangle: false
    }))
    .pipe(replace(/('|")use strict\1/g, ';'))
    .pipe($.size({title: 'scripts'}))
    .pipe(dest('dist/scripts'))
    .pipe(dest('.tmp/scripts'));
  cb();
});

// templates - variables replacement
task('templates', (cb) => {
  src(['app/*.html', 'app/blocks/**/*.html'])
    .pipe(include({
        prefix: "@@",
        basepath: "@file"
    }))
    .pipe(replace('@Timestamp', Date.now() ))
    .pipe(replace('@LazyLoadScript', lazyLoadScript))
    .pipe(dest('.tmp/'));
  cb();
});

// templates build
task('templates:build', (cb) => {
  src('dist/*.html')
    .pipe(replace('@Timestamp', Date.now() ))
    .pipe(dest('dist/'));
  cb();
});

// Lint JavaScript
task('jsLinter', (cb) => {
  src(['./app/scripts/**/*.js', './app/scripts/**/*.es6'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {beep: true}));
  cb();
});

// Copy images to dist directory
task('images', (cb) => {
  src('app/images/**/*')
    .pipe(dest('dist/images'))
  cb();
});

// Copy images to .tmp folder while developing
task('copy:images-dev', (cb) => {
  src('app/images/**/*')
    .pipe(dest('.tmp/images'));
  cb();
});

// Copy fonts to .tmp folder while developing
task('copy:fonts-dev', (cb) => {
  src('app/fonts/**/*')
    .pipe(dest('.tmp/fonts'));
  cb();
});

// Copy all files at the root level (app)
task('copy', (cb) =>
  src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  })
    .pipe(dest('dist'))
    .pipe($.size({title: 'copy'}))
);

// Copy fonts
task('copy:fonts', (cb) => {
  src([
    'app/fonts/**/*'
  ], {
    dot: true
  })
  .pipe(dest('dist/fonts'))
  .pipe($.size({title: 'copy fonts'}));
  cb();
});

// Sass compilation
task('styles', (cb) => {
  src('app/styles/*.scss')
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed',
      precision: 6
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(dest('.tmp/styles'))
    // Concatenate and minify styles
    /*.pipe($.if('*.css', $.cssnano({
      autoprefixer: {browsers: AUTOPREFIXER_BROWSERS, add: true},
      reduceIdents: false,
      zindex: false
    })))*/
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(dest('dist/styles'))
    .pipe(dest('.tmp/styles'));

  cb();
});

task('styles:dev', (cb) => {
  src('app/styles/*.scss')
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(dest('.tmp/styles'))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(dest('.tmp/styles'))
    .pipe(server.reload({stream: true}));
  cb();
});

// Scan your HTML for assets & optimize them
task('html', (cb) => {
  let stream = src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))
    .pipe(replace('@LazyLoadScript', lazyLoadScript));

    // Minify any HTML only if minified mode enabled
    if (HTML_BUILD === 'minified') {
      stream = stream
        .pipe($.if('*.html', $.htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true
        })));
    }

    // Output files
    stream = stream
      .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
      .pipe(dest('dist'));
  cb();
});

// all images/icons/*.svg files into one file
task('svgstore', function (cb) {
  src('app/images/icons/*.svg')
    .pipe(svgmin((file) => {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        }
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(dest('app/images'))
    .pipe(dest('.tmp/images'))
    .pipe(dest('dist/images'));
  cb();
});

// Clean output directory
task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
task('copy-sw-scripts', () =>
  src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(dest('dist/scripts/sw'))
);

task('write-service-worker', (cb) => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/!(tmp)/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/'
  }, cb);
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
task('generate-service-worker', series('copy-sw-scripts', 'write-service-worker'));

// Watch files for changes & reload
const watchStyles = () => watch(['app/styles/**/*.{scss,css}'], series('styles:dev'));
const watchTemplates = () => watch(['app/*.html'], series('templates', reload));
const watchScripts = () => watch(['app/scripts/**/*.js'], series('scripts:dev', reload));
const watchImages = () => watch(['app/images/**/*', '!app/images/**/*.svg'], series('copy:images-dev', reload));
const watchIcons = () => watch(['app/images/icons/**/*'], series('svgstore', reload));
const watchFonts = () => watch(['app/fonts/**/*'], series('copy:fonts-dev', reload));

task('watch', parallel(serve, watchStyles, watchTemplates, watchScripts, watchImages, watchIcons, watchFonts));
task('buildForDev', series('styles:dev', 'templates', 'scripts:dev', 'copy:fonts-dev', 'copy:images-dev', 'svgstore'));
task('serve', series('buildForDev', 'watch'));

// Build production files, the default task
task('default', series(
  'clean',
  series(
    'styles',
    'html',
    'jsLinter',
    'scripts:build',
    'images',
    'svgstore',
    'copy',
    'copy:fonts',
    'templates:build',
  ),
  'generate-service-worker'
));

// Build and serve the output from the dist build
task('serve:dist', parallel('default', (cb) => {
  browserSync({
    open: false,
    notify: false,
    logPrefix: 'BP',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  });
  cb();
}));
