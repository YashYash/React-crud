var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  csslint = require('gulp-csslint'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  prefix = require('gulp-autoprefixer'),
  react = require('gulp-react'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  reactify = require('reactify')
  config = require('../client/config')

var currentApp;

// Return the app
function getApp(app) {
  return config[app];
}

gulp.task('start', function() {
  console.log('#### Gulp tasks for ' + currentApp.name + ' ran successfully');
  nodemon({
    script: '../server/start.js'
  })
});

gulp.task('templates', function() {
  gulp.src('views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(livereload());
});

gulp.task('cssLint', function() {
  console.log('#### Css Linting - ' + currentApp.name);
  var path = currentApp.cssPath;
  gulp.src(path)
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(livereload());
});

gulp.task('styles', function() {
  console.log('#### Css Minification and Concatination - ' + currentApp.name);
  var path = currentApp.cssPath;
  var cssDest = currentApp.cssDest;
  var cssFileName = currentApp.cssFileName;

  gulp.src(path)
    .pipe(plumber())
    .pipe(concat(cssFileName))
    .pipe(minifyCss())
    .pipe(prefix('last 3 versions'))
    .pipe(gulp.dest(cssDest))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  console.log('#### JS Minification and Concatination - ' + currentApp.name);
  var path = currentApp.jsPath;
  var jsDest = currentApp.jsDest;
  var jsFileName = currentApp.jsFileName;
  browserify({
      entries: [currentApp.mainJs],
      extensions: ['.jsx'],
      paths: ['../node_modules', './js/']
    })
    .transform(reactify)
    .bundle()
    .pipe(source(jsFileName))
    .pipe(gulp.dest(jsDest))
    .pipe(livereload());
});


gulp.task('watch', function() {

  console.log('#### Watching file changes');
  
  var jsPath = currentApp.jsPath;
  var cssComponentsPath = currentApp.cssPath;
  var cssGlobalPath = currentApp.cssPath;
  var componentsPath = currentApp.componentsPath;
  var storesPath = currentApp.storesPath;
  var actionsPath = currentApp.actionsPath;

  livereload.listen();

  // server
  gulp.watch('../server/app.js', ['start']);
  gulp.watch('../server/start.js', ['start']);
  gulp.watch('../server/routes/*.js', ['start']);
  gulp.watch('../server/api/*.js', ['start']);

  // client
  gulp.watch('views/*.jade', ['templates']);
  gulp.watch(cssComponentsPath, ['cssLint', 'styles', 'start']);
  gulp.watch(cssGlobalPath, ['cssLint', 'styles', 'start']);
  gulp.watch(jsPath, ['scripts']);
  gulp.watch(componentsPath, ['scripts']);
  gulp.watch(storesPath, ['scripts']);
  gulp.watch(actionsPath, ['scripts']);

});

/* Prepare App One */
gulp.task('app-one', function() {
  currentApp = getApp('app-one');
  console.log('#### Running Gulp tasks for ' + currentApp.name);
  gulp.start(['watch', 'templates', 'cssLint', 'styles', 'scripts', 'start']);
});

/* This is used to build another react app */
/* Like every other SPA, at a certain point it is better to create another app */

/* Prepare App Two */
gulp.task('app-two', function() {
  currentApp = getApp('app-two');
  console.log('#### Running Gulp tasks for ' + currentApp.name);
  gulp.start(['watch', 'templates', 'cssLint', 'styles', 'scripts', 'start']);
});
