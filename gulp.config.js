var historyApiFallback = require('connect-history-api-fallback');

module.exports = function () {

    var root = 'src/';
    var app = root + 'app/';
    var index = root + 'index.html';
    //Distribution directory
    var dist = 'dist/';
    var distApp = dist + 'app/';

    var build = {
        path: dist,
        app: 'build/app/',
        fonts: 'build/fonts',
        assetPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };

    var bootstrapSass = {
        in: './node_modules/bootstrap-sass'
    };

    var fonts = {
        in: ['app/fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: 'dist/fonts'
    };

    var sass = {
        in: root + '**/*.scss',
        out: dist,
        watch: root + '**/*.scss',
        sassOpts: {
            outputStyle: 'nested',
            precision: 3,
            errLogToConsole: true,
            includePaths: [bootstrapSass.in + '/assets/stylesheets']
        }
    };

    var browserSync = {
        dev: {
            injectChanges: true,
            port: 3000,
            server: {
                baseDir: './' + dist,
                middleware: [historyApiFallback()]
            },
            reloadDelay: 1000
        },
        prod: {
            port: 3001,
            server: {
                baseDir: './' + build.path,
                middleware: [historyApiFallback()]
            }
        }
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            mangle: true,
            globalDefs: {DEBUG: false}
        }
    };


    var config = {
        root: root,
        app: app,
        fonts: fonts,
        bootstrapSass: bootstrapSass,
        sass: sass,
        browserSync: browserSync,
        systemJs: systemJs,
        dist: dist,
        distApp : distApp,
        allts: [
            app + '**/*.ts'
        ],
        copyAssets: [
            root + '**/*' ,
            '!' + root + '**/*.ts',
            '!' + root + '**/*.scss'
        ],
        allWatch: [
            app + '**/*.ts',
            app + '**/*.{html,htm}'
        ]
    };

    return config;

};