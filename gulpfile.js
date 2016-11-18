var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFiles).pipe(jshint.reporter('jshint-stylish', {
        verbose: true
    }))
        .pipe(jscs());
});

// Inject bower dependencies automatically
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    // The directories for our custom js & css files
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'],
        {
            read: false
        }); // Don't read the src files

    var injectOptions = {
        ignorePath: '/public'
    }

    // Tell wiredep where to look for the bower.json  in public/lib
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    }

    return gulp.src('./src/views/*.html')
    //gulp.src('./src/views/*.jade') // To inject into index.jade
               .pipe(wiredep(options))
               .pipe(inject(injectSrc, injectOptions))
               .pipe(gulp.dest('./src/views'))
});

// Run style & inject before running nodemon
gulp.task('serve', ['inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1, // Wait 1 sec
        env: {
            'PORT': 5000
        },
        watch: jsFiles // Watch for all JS file changes
    }

    return nodemon(options).on('restart', function (ev) {
        console.log('Restarting...');
    })
})
