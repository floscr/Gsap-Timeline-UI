module.exports = function(config) {

  'use strict';

  var gulp = require('gulp'),
      pipe = require('multipipe'),
      rename = require('gulp-rename'),
      gulpif = require('gulp-if'),
      changed = require('gulp-changed');

  var browserSync = require('browser-sync');

  var iconfont = require('gulp-iconfont'),
      consolidate = require('gulp-consolidate');

  var paths = config.paths.icon;

  /*-------------------------------------------------------*\
  * Task
  \*-------------------------------------------------------*/

  var runTimestamp = Math.round(Date.now()/1000);

  gulp.task('icons', function() {
    return gulp.src([paths.src + '/**.svg'])

      .pipe(changed(paths.dst))

      .pipe(iconfont({
        fontName: 'icons',
        normalize: true,
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
        centerHorizontally: true,
        fontHeight: 100,
      }))

      // creating CSS files and sample page
      .on('glyphs', function(glyphs, options) {

        var iconsOptions = {
          glyphs: glyphs,
          fontName: 'icons',
          fontPath: '../fonts/iconfont/', // Relative to the generated stylesheet
          className: 'icon',
        }

        // Creation of the templates
        gulp.src('src/iconfont/templates/icon-template.css')
          .pipe(consolidate('lodash', iconsOptions))
          .pipe(rename('_icons-generated.scss'))
          .pipe(gulp.dest(config.paths.css.src + '/modules/iconfonts/'));

      })

      .pipe(gulp.dest(paths.dst));

  });

}
