// ----- Gulp File ----- //

// Requirements //

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var minifycss   = require('gulp-minify-css');
var plumber     = require('gulp-plumber');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
const babel     = require('gulp-babel');

// Browser-Sync //

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Gulp Watch //

gulp.task('watch', ['browser-sync'], function(){
    gulp.watch("src/**/*.html", ['html']);
    gulp.watch("src/**/*.js", ['scripts']);
    gulp.watch("src/**/*.scss", ['styles']);
    gulp.watch("src/**/*", ['images']);
    gulp.watch("src/**/*.{ttfc,woff,woff2,eof,svg}", ['fonts']);
    gulp.watch("src/**/*.html", ['bs-reload']);
});

// HTML Pipe //

gulp.task('html', function(){
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('./dist/'))
});

// Script Pipe //

gulp.task('scripts', function(){
  return gulp.src('src/**/*.js')
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.reload({stream:true}))
});

// SCSS Compile + Pipe //

gulp.task('styles', function(){
  gulp.src(['src/**/*.scss'])
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }
  }))
  .pipe(sass())
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.reload({stream:true}))
});

// Fonts Pipe //

gulp.task('fonts', function(){
  gulp.src('src/**/*.{ttf,woff,woff2,eof,svg,txt}')
  .pipe(gulp.dest('./dist/'))
});

// Images Pipe //

gulp.task('images', function(){
  gulp.src('src/**/*.{png,ico,svg,jpg,jpeg,gif,tiff,raw}')
  .pipe(gulp.dest('./dist/'))
});

// Gulp Default //

gulp.task('default', ['watch', 'html', 'scripts', 'styles', 'fonts', 'images']);
