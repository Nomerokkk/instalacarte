const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('remove_php', function() {
	return gulp.src('./dist/**/*.html')
		.pipe(clean({force: true}));
});

gulp.task('htmlgenerate', function() {
	return gulp.src('./src/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('jsgenerate', function() {
	return gulp.src(['./src/js/*.js'])
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', function() {
	browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
	
	gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./src/**/*.html', gulp.series('remove_php', 'htmlgenerate'));
	gulp.watch('./src/js/*.js', gulp.series('jsgenerate'));
});

gulp.task('build', function() {
	gulp.src([
		'./src/css/style.css',
		'./src/libs/swiper/package/css/swiper.min.css',
		'./src/libs/fancybox/dist/jquery.fancybox.min.css',
	])
		.pipe(concat('all.min.css'))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./src/css/'));
		
	gulp.src([
		'./src/libs/jquery/dist/jquery.min.js', 
		'./src/libs/particles.js-master/particles.min.js',
		'./src/libs/swiper/package/js/swiper.min.js',
		'./src/libs/jquery-lazy/jquery.lazy.min.js',
		'./src/libs/jquery-lazy/plugins/jquery.lazy.picture.min.js',
		'./src/libs/wow/dist/wow.min.js',
		'./src/libs/fancybox/dist/jquery.fancybox.min.js',
		'./src/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js',
		'./src/libs/svg4everybody.min.js',
		'./src/js/common.js',
		'./src/js/particles.js',
		'./src/js/map.js'
	])
		.pipe(concat('all.js'))
		.pipe(minify())
		.pipe(gulp.dest('./src/js/'));
});

exports.default = gulp.series('watch');