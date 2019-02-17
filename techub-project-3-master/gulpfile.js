let gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

// Running Server
gulp.task('connect', function(){
    connect.server({
        port: 3000,
        root: './public',
        livereload: true
    })
})

// HTML Running Task
gulp.task('html', function () {
    return gulp.src('./public/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});

// SCSS Running Task
gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/styles'))
        .pipe(connect.reload());
});

// JavaScript Running Task
gulp.task('jsConcat', function () {
    return gulp.src('./src/javascript/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/assets/scripts'));
});

// Watching all the Important Files for Changing
gulp.task('watch', function () {
    gulp.watch('./public/*.html',['html']);
    gulp.watch('./src/scss/**/*.scss',['sass']);
    gulp.watch('./src/javascript/**/*.js',['jsConcat']);
});

gulp.task('default', ['connect','html','sass','jsConcat','watch']);