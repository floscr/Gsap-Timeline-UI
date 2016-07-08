/**
 * BrowserSync
 * Browser Liverload, Style injections and much more
 * http://www.browsersync.io/
 */
module.exports = function(config) {

  'use strict';

  const gulp = require('gulp');
  const browserSync = require('browser-sync');

  /*-------------------------------------------------------*\
  * Task
  \*-------------------------------------------------------*/

  let opts = {
    ghostMode: false,
    open: true,
    scrollThrottle: 10,
    server: {
      baseDir: config.root
    },
  };

  gulp.task('browserSync', function() {
    browserSync(opts);
  });

  gulp.task('reload', function() {
    browserSync.reload();
  });

}
