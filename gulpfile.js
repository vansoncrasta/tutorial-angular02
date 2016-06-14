var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var gulpUtil = require('gulp-util');
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require("browser-sync").create();
var config = require('./gulp.config')();
var tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
    log("Cleaning distribution directory : " + config.dist);
    return del([config.dist]);
});


// create a task that ensures the task is complete before
// reloading browsers
gulp.task('all-watch', ['compile', 'copy:assets'], function () {
    log("Reloading browser");
    browserSync.notify('reloading now ...');
    browserSync.reload({stream: false});
});

gulp.task('index-watch', ['copy:index'], function () {
    log("Reloading browser");
    browserSync.notify('reloading now ...');
    browserSync.reload({stream: false});
});

gulp.task('serve', ['build'], function () {

    browserSync.init(config.browserSync.dev);

    // Compile sass into CSS & auto-inject into browsers.
    // This is done  inside the sass function
    gulp.watch([config.sass.watch], ['sass'])
        .on('change', function (event) {
            changeEvent(event);
        });

    gulp.watch([config.allWatch], ['all-watch'])
        .on('change', function (event) {
            changeEvent(event);
            browserSync.notify('reloading now ...');
            browserSync.reload({stream: false});
    });

    gulp.watch([config.root + 'index.html'], ['index-watch'])
        .on('change', function (event) {
            changeEvent(event);
        });
});

gulp.task('fonts', function () {
    return gulp
        .src(config.fonts.in)
        .pipe(gulp.dest(config.fonts.out));
});

gulp.task('sass', ['fonts'], function () {
    log("Compiling SCSS --> CSS");
    return gulp.src(config.sass.in)
        .pipe(sass(config.sass.sassOpts))
        .pipe(gulp.dest(config.sass.out))
        .pipe(browserSync.stream());
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
    return gulp.src(config.copyAssets, {base: './'+config.root} , {nodir: true })
        .pipe(gulp.dest(config.dist))
});

gulp.task('copy:index', function () {
    return gulp.src([config.root + 'index.html', config.root + 'systemjs.config.js'])
        .pipe(gulp.dest(config.dist))
});

/// copy dependencies
gulp.task('copy:libs', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/**',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/rxjs/**',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/@angular/**'
        ], {base: './node_modules'})
        .pipe(gulp.dest(config.dist + 'lib'))
});

// TypeScript compile
gulp.task('compile', function () {
    log("Compiling ts --> js files under : " + config.allts);
    var tsResult = gulp.src(config.allts)
        .pipe(sourcemaps.init())
        .pipe(ts(tscConfig.compilerOptions));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.distApp));
});

gulp.task('build', function (cb) {
    runSequence('clean', ['compile', 'copy:libs', 'copy:assets', 'copy:index', 'sass'], cb);
});

gulp.task('default', ['build']);

//Logging Change Event
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.app + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}


//Function to log messages.
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                gulpUtil.log(gulpUtil.colors.blue(msg[item]));
            }
        }
    } else {
        gulpUtil.log(gulpUtil.colors.blue(msg));
    }
}