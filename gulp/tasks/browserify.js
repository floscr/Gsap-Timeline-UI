/**
 * BROWSERIFY
 * Bundle javascript files into one bundle.
 * http://browserify.org/
 */
module.exports = function(config) {

  'use strict';

  const gulp       = require('gulp');
  const util       = require('gulp-util');
  const gulpif     = require('gulp-if');
  const pipe       = require('multipipe');
  const glob       = require('glob');
  const path       = require('path');

  // Tasks
  const browserify = require('browserify');
  const es         = require('event-stream');
  const source     = require('vinyl-source-stream');
  const buffer     = require('vinyl-buffer');
  const reload     = require('browser-sync').reload;

  // Transforms
  const uglify     = require('gulp-uglify');
  const babelify   = require('babelify');
  const watchify   = require('watchify');

  // Path variable
  let paths      = config.paths.js;

  /*-------------------------------------------------------*\
  * Task
  \*-------------------------------------------------------*/

  /**
   * Bundle script files.
   * Watchify takes care of browser refresh and caching none changed modules,
   * for a faster bundle creation.
   * In production the final bundle gets minfied.
   */
  gulp.task('scripts', done => {
    return glob(paths.src + paths.files, (err, files) => {
      let tasks = files.map(entry => {

        var b = browserify({
          debug: !config.production,
          entries: [entry],
          cache: {},
          packageCache: {},
          fullPaths: !config.production,
        });

        // Use watchify when gulp watch is enabled
        if (config.watch) {
          b = watchify(b);
        };

        b.transform(babelify);

        const build = function() {
          let filename = path.basename(entry);
          let updateStart = Date.now();
          return b.bundle()
            .on('error', error => {
              util.log(util.colors.red(`Error: ${error}`));
            })
            .on('end', () => {
              util.log('Updating ' + util.colors.green(filename));
            })
            .pipe(source(filename))
            .pipe(gulpif(config.production, pipe(
              buffer(),
              uglify()
            )))

            .pipe(gulp.dest(paths.dst))


            .on('end', () => {
              util.log('Done! ' + util.colors.green((Date.now() - updateStart) + 'ms'));
            })
            .pipe(reload({
              stream: true,
              once: true
            }));
        }

        b.on('update', build)
        return build();
      });
      es.merge(tasks)
        .on('end', done);
    });

  });
};

