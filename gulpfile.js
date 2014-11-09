var gulp = require('gulp'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint');


var paths = {
    scripts: ['./server/public/js/*.js', './server/public/js/**/*.js'],
    sass: ['./server/public/sass/*.scss', './server/public/sass/**/*.scss'],
    images: './server/public/img/*'
}


gulp.task('compass', function () {
    gulp.src('server/public/sass/*.scss')
        .pipe(compass({
            http_path: "server/public/",
            css: "server/public/css",
            sass: "server/public/sass",
            images: "server/public/img",
            require: ['modular-scale']
        }))
        .pipe(gulp.dest('server/public/css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('server/public/build/css'));
});

gulp.task('minImg', function () {
    gulp.src('server/public/img/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('server/public/build/img'));
});

gulp.task('hint', function() {
    gulp.src('server/public/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['compass','minImg']);

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.sass, ['compass']);
    gulp.watch(paths.images, ['minImg']);
});