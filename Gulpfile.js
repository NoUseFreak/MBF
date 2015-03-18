var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    concat = require('gulp-concat'),
    notify = require("gulp-notify");

var paths = {
    "scripts": "src/**/*.js"
};

var errorHandler = notify.onError(function (err) {
    return "Error: " + err.message;
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(traceur())
        .on('error', errorHandler)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
});