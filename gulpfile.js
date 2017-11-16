// ----- Gulp File ----- //

/*

// Key Functions //

gulp:               launches localhost:3000 and watches all files for changes
gulp build:         compiles, minifies and compresses code for deployment

*/

// Dependencies //

const browserSync   = require('browser-sync');
const log           = require('fancy-log');
const gulp          = require('gulp');
const babel         = require('gulp-babel');
const build         = require('gulp-build');
const changed       = require('gulp-changed');
const clean         = require('gulp-clean');
const foreach       = require('gulp-foreach');
const minifycss     = require('gulp-minify-css');
const plumber       = require('gulp-plumber');
const rename        = require('gulp-rename');
const sass          = require('gulp-sass');
const uglify        = require('gulp-uglify');
const zip           = require('gulp-vinyl-zip');
const path          = require('path');

// Browser-Sync //

gulp.task('browser-sync', function() {
  log('Starting Browser-Sync');
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
  log('Browser Reloaded');
});

// Gulp Watch //

gulp.task('watch', ['browser-sync'], function() {
  log('Watching Files for Change');
  gulp.watch("src/**/*.html", ['html']);
  gulp.watch("src/**/*.js", ['scripts']);
  gulp.watch("src/**/*.scss", ['styles']);
  gulp.watch("src/**/*", ['media']);
  gulp.watch("src/**/*.{ttfc,woff,woff2,eof,svg}", ['fonts']);
  gulp.watch("src/**/*.html", ['bs-reload']);
});

// HTML Pipe //

gulp.task('html', function() {
  log('Piping HTML Files to Dist');
  gulp.src(['src/**/*.html', 'src/**/*.json'])
    .pipe(changed('./dist/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }))
});

// Script Pipe //

gulp.task('scripts', function() {
  log('Piping JavaScript to Dist');
  return gulp.src(['src/**/*.js', '!**/*.min.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message);
        this.emit('end');
      }
    }))
    .pipe(changed('./dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }))
});

// Vendor Script Pipe //

gulp.task('vendor', function() {
  log('Piping Vendor Files to Dist');
  return gulp.src('src/**/*.min.js')
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message);
        this.emit('end');
      }
    }))
    .pipe(changed('./dist/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }))
});

// SCSS Compile + Pipe //

gulp.task('styles', function() {
  log('Piping Styles to Dist');
  gulp.src(['src/**/*.scss'])
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }))
});

// Fonts Pipe //

gulp.task('fonts', function() {
  log('Piping Fonts to Dist');
  gulp.src('src/**/*.{ttf,woff,woff2,eof,svg,txt}')
    .pipe(changed('./dist/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }))
});

// Images and Video Pipe //

gulp.task('media', function() {
  log('Piping Images and Video to Dist');
  gulp.src('src/**/*.{png,ico,svg,jpg,jpeg,gif,tiff,raw,mp4,mpeg,mov,avi}')
    .pipe(changed('./dist/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }))
});

// Gulp Default //

gulp.task('default', ['watch', 'html', 'scripts', 'vendor', 'styles', 'fonts', 'media']);

// Gulp Compile //
gulp.task('clean', function(cb) {
  log('Clearing build files');
  return gulp.src(['build', 'compressed/'], { read: false })
    .pipe(clean())
    .on('end', function() {
      log('Cleared existing build files')
    })
})

gulp.task('compile', ['clean'], function(cb) {

  log('Building Project for Deployment');

  return Promise.all([
    new Promise((resolve, reject) => {
      log('Piping HTML Files to Build');
      gulp.src(['src/**/*.html', 'src/**/*.json'])
        .on('error', reject)
        .pipe(gulp.dest('./build/'))
        .on('end', resolve)
    }),
    new Promise((resolve, reject) => {
      log('Minifying JavaScript');
      gulp.src(['src/**/*.js', '!**/*.min.js'])
        .on('error', reject)
        .pipe(rename({ suffix: '.min' }))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'))
        .on('end', resolve)
    }),
    new Promise((resolve, reject) => {
      log('Piping Vendor Files to Build');
      gulp.src('src/**/*.min.js')
        .on('error', reject)
        .pipe(gulp.dest('./build/'))
        .on('end', resolve)
    }),
    new Promise((resolve, reject) => {
      log('Minifying Styles');
      gulp.src(['src/**/*.scss'])
        .on('error', reject)
        .pipe(sass())
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/'))
        .on('end', resolve)
    }),
    new Promise((resolve, reject) => {
      log('Piping Fonts to Build');
      gulp.src('src/**/*.{ttf,woff,woff2,eof,svg,txt}')
        .on('error', reject)
        .pipe(gulp.dest('./build/'))
        .on('end', resolve)
    }),
    new Promise((resolve, reject) => {
      log('Piping Images & Videos to Build');
      gulp.src('src/**/*.{png,ico,svg,jpg,jpeg,gif,tiff,raw,mp4}')
        .on('error', reject)
        .pipe(gulp.dest('./build/'))
        .on('end', resolve)
    })
  ]).then(function() {
    log('Built all files')
  });

  // End Compile //

});

// Build & Compress for Deployment //

gulp.task('build', ['compile'], function() {
  log('Compressing Files for Deployment');
  return gulp.src(['build'])
    .pipe(foreach(function(stream, file) {
      var name = path.basename(file.path);
      log('Compressing Website');
      return gulp.src(['./build/' + name + '/**/*'])
        .pipe(zip.dest('Archive' + '.zip'))
    })).on('end', function() {
      log('Finished compressing build file')
    })
});
