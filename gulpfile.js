var gulp        = require('gulp');
var amdOptimize = require('gulp-amd-optimizer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var jshint      = require('gulp-jshint');
var del         = require('del');

var requireConfig = {
    baseUrl: 'src/script'
};

var options = {
    umd: false
};

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('check', ['clean'], function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(['src/**/*.css', 'src/**/*.html'])
        .pipe(gulp.dest('build'));
});

gulp.task('bundle-js', ['clean'], function () {
    return gulp.src(['src/script/**/*.js', 'src/index.js'], {base: requireConfig.baseUrl})
        .pipe(amdOptimize(requireConfig, options))
        .pipe(concat('index.js'))
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(gulp.dest('build'));
});

gulp.task('banner', ['bundle-js'], function () {
    return gulp.src(['src/banner.js', 'build/index.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['check', 'banner', 'copy'], function () {

});