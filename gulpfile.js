var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
const minify = require('gulp-minify');

// 一次性编译 Less
gulp.task('less', function() {
    return gulp.src('less/blog.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('css'));
});

gulp.task('js', function () {
    return gulp.src('js/blog.js')
        .pipe(minify())
        .pipe(gulp.dest('js'));
});

// 实时编译
gulp.task('default', ['less', 'js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('js/blog.js', ['js'])
});