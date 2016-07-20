'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;

let config = require('gulp-config-bootstrap')('gulp/gulpconfig.json');
let paths = config.paths;

config.watch = true;
config.paths.js.dst = 'test/assets/js';
config.paths.icon.dst = 'test/assets/fonts/iconfont';
config.paths.css.dst = 'test/assets/css';

if (argv._[0] === 'build') {
  config.production = true;
  config.paths.js.dst = 'build';
  config.paths.css.dst = 'build';
  config.paths.icon.dst = 'build';
}

config.banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

/*-------------------------------------------------------*\
* Tasks
\*-------------------------------------------------------*/

require('./gulp/tasks/browserify')(config);
require('./gulp/tasks/browserSync')(config);

/*-------------------------------------------------------*\
* Watch
\*-------------------------------------------------------*/

// Better watcher task that doesn't exit when creating/deleting folders
function watchTask(paths, tasks) {
  return watch(paths, () => {
    runSequence(tasks);
  });
}
gulp.task('watch', ['reload', 'browserSync'], function() {
});

/*-------------------------------------------------------*\
* Task Bundles
\*-------------------------------------------------------*/

// Compile all files
gulp.task('compile', [
  'scripts',
]);

// Continous Compilation
gulp.task('compile-and-watch', function(cb) {
  runSequence(
    ['compile', 'watch']
  );
});

// Build for production
gulp.task('build', function(cb) {
  config.watch = false;
  runSequence(['compile'], cb);
});

// Build for production
gulp.task('default', ['compile-and-watch']);

// Test gulp without compiling
gulp.task('testgulp', []);
