'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    del = require('del'),
    concat = require('gulp-concat'),
    prefixer = require('gulp-autoprefixer'),
    util = require('gulp-util'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    sourcemaps = require('gulp-sourcemaps'),
    // rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    spritesmith = require('gulp.spritesmith'),
    wait = require('gulp-wait'),
    gulpsync = require('gulp-sync')(gulp),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

    // paths:
    var path = {

        bower: {
            _src: ['public/bower/knockout/dist/knockout.js',
                   'public/bower/jquery/dist/jquery.min.js',
                   'public/bower/bootstrap/dist/js/bootstrap.min.js',
                   'public/bower/cropbox/jquery.cropbox.js'
            ]
        },

        scripts: {
            _src: 'src/js/**/*.js',
            _dest: './public/js/',
            _del: './public/js/**/*.*'
        },

        styles: {
            _src: 'src/css/main.styl',
            _dest: './public/css/',
            _del: './public/css/**/*.*'
        },

        images: {
            _src: 'src/img/*.{png,jpg,gif,ico,svg}',
            _dest: './public/img/',
            _del: './public/img/**/*.*'
        },

        html: {
            _src: 'src/*.html',
            _dest: './public/',
            _del: './public/**/*.html'
        },

        favicon: {
          _src: 'src/*.ico',
          _dest: './public/'
        },

        fonts: {
            _src: 'src/fonts/*.*',
            _dest: './public/fonts'
        }
    };

// ======= function

function error (error) {
    util.log(util.colors.red(error.toString()));
}
function change (event) {
    util.log(util.colors.blue('File ' + event.path + ' was ' + event.type));
    gulp.task('style:dev', ['css:del'], function () {
     return gulp.src(path.styles._src)
        .pipe(sourcemaps.init())
        .pipe(stylus({use:[jeet()]})).on('error', error)
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.styles._dest))
        .pipe(browserSync.reload({stream:true}));
    });
}
function Gdelete (error, deletedFiles) {
    if (error) error(error);
    util.log(util.colors.yellow('Files deleted: ', deletedFiles.join(', ')));
}
// ============
//=== webserver ===//
var config = {
    server: {
        baseDir: "./public"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000
};

gulp.task('webserver', function () {
    browserSync(config);
});

//=== html ===//
gulp.task('html', ['html:del'], function () {
 return gulp.src(path.html._src)
    .pipe(gulp.dest(path.html._dest))
    .pipe(browserSync.reload({stream:true}));
});
gulp.task('html:del', function () {
   return del(path.html._del, Gdelete);
});

//=== favicon ===//
gulp.task('favicon', function () {
 return gulp.src(path.favicon._src)
    .pipe(gulp.dest(path.favicon._dest))
})

//=== js ===//
gulp.task('js:prod', ['js:del'], function () {
 return gulp.src('./src/js/main.js')
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest(path.scripts._dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js:dev', ['js:del'], function () {
  return gulp.src('./src/js/partials/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest(path.scripts._dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js:del', function () {
    del(path.scripts._del, Gdelete);
});

//=== style ===//
gulp.task('style:dev', ['css:del'], function () {
 return gulp.src(path.styles._src)
    .pipe(sourcemaps.init())
    .pipe(stylus({use:[nib(),jeet(),rupture()], 'include css': true})).on('error', error)
    .pipe(prefixer({ browsers: ['last 2 version'], cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.styles._dest))
    .pipe(browserSync.reload({stream:true}));
});
gulp.task('css:del', function () {
    del(path.styles._del, Gdelete);
});

gulp.task('style', ['css:del', 'image'], function () {
 return gulp.src(path.styles._src)
    .pipe(stylus({
        compress: true,
        errLogToConsole: true,
        use:[nib(),jeet(),rupture()],
        'include css': true
    })).on('error', error)
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.styles._dest))
    .pipe(browserSync.reload({stream:true}));
});
gulp.task('css:del', function () {
    del(path.styles._del, Gdelete);
});

//=== inject ===//
gulp.task('inject:dev', function () {
   var css = gulp.src(['./public/css/*.css'], {read: false});
   var bower = gulp.src(path.bower._src, {read: false});
   var js = gulp.src(['./public/js/*.js'], {read: false});
 return gulp.src(path.html._src)
   .pipe(inject(css, {ignorePath: "public/", addRootSlash: false }))
   .pipe(inject(bower, {name: 'bower', ignorePath: "public/", addRootSlash: false}))
   .pipe(inject(js, {ignorePath: "public/", addRootSlash: false }))
   .pipe(gulp.dest(path.html._dest))
   .pipe(browserSync.reload({stream:true}));
});

gulp.task('inject:prod', function () {
   var css = gulp.src(['./public/css/main.css'], {read: false});
   var js = gulp.src('./public/js/main.js', {read: false});
 return gulp.src(path.html._src)
   .pipe(inject(css, {ignorePath: "public/", addRootSlash: false }))
   .pipe(inject(js, {ignorePath: "public/", addRootSlash: false }))
   .pipe(gulp.dest(path.html._dest))
   .pipe(browserSync.reload({stream:true}));
});

//=== image ===//

gulp.task('image', ['img:del'], function () {
  return gulp.src(path.images._src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })).on('error', error)
        .pipe(gulp.dest(path.images._dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img:del', function () {
    del(path.images._del, Gdelete);
});

gulp.task('sprite', function() {
    var spriteData =
    gulp.src('src/img/sprite/*.png')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.styl',
                imgPath: '../img/sprite.png'
            }));

   return spriteData.img.pipe(gulp.dest('src/img/')), spriteData.css.pipe(gulp.dest('src/css/partials/'))
    .pipe(browserSync.reload({stream:true}));
});

//=== fonts ===//
gulp.task('fonts', function(){
   return gulp.src(path.fonts._src)
   .pipe(gulp.dest(path.fonts._dest))

})

//=== watch ===//

gulp.task('watch', function(){
  var htmlWatcher = gulp.watch(path.html._src, ['inject:dev']);
  var styleWatcher = gulp.watch(['src/css/**/*.*'], ['style:dev']);
  var jsWatcher = gulp.watch(path.scripts._src, ['js:dev']);
  var imgWatcher = gulp.watch(path.images._src, ['image']);
  var spriteWatcher = gulp.watch(['src/img/sprite/*.png'], ['sprite']);

  htmlWatcher.on('change', change);
  styleWatcher.on('change', change);
  jsWatcher.on('change', change);
  imgWatcher.on('change', change);
  spriteWatcher.on('change', change);
});

gulp.task('all:dev', ['inject:dev' ,'webserver']);
gulp.task('dev', gulpsync.sync(['style:dev', 'image', 'favicon', 'sprite', 'fonts', 'html', 'js:dev', 'all:dev', 'watch']));
gulp.task('default', gulpsync.sync(['style', 'html', 'favicon', 'js:dev', 'inject:prod', 'sprite', 'fonts']));
