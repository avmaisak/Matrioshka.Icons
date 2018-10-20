'use strict';

let gulp = require('gulp'),
	iconfont = require('gulp-iconfont'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	raster = require('gulp-raster'),
	consolidate = require('gulp-consolidate'),
	fs = require('fs');

// clean dist folder before build
gulp.task('clean', () => {
	return gulp.src('dist/*')
		.pipe(clean({
			force: true
		}));
});

// generate png images from svg (optional)
gulp.task('png', () => {
	return gulp.src('./src/svg/*.svg')
		.pipe(raster())
		.pipe(rename({
			extname: '.png'
		}))
		.pipe(gulp.dest('./dist/i'))
});

// generate icon fonts  from svg
gulp.task('icon', () => {
	return gulp.src('src/svg/*.svg')
		.pipe(iconfont({
			fontName: 'matrioshkaIcons',
			formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
			appendCodepoints: true,
			appendUnicode: false,
			normalize: true,
			fontHeight: 1001,
			centerHorizontally: true
		}))
		.on('glyphs', function (glyphs, options) {
			gulp.src('src/template/matrioshka-icons.css')
				.pipe(consolidate('underscore', {
					glyphs: glyphs,
					fontName: options.fontName,
					fontDate: new Date().getTime()
				}))
				.pipe(gulp.dest('dist/css/'));

			gulp.src('src/template/matrioshka-icons.html')
				.pipe(consolidate('underscore', {
					glyphs: glyphs,
					fontName: options.fontName
				}))
				.pipe(gulp.dest('dist/'));
		})
		.pipe(gulp.dest('dist/fonts/'));
});

//minimize css
gulp.task('css-min', () => {
	return gulp.src("dist/css/*.css")
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: ".min",
			extname: ".css"
		}))
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('json', () => {
	return new Promise(function (resolve, reject) {
		let fsList = [];
		fs.readdir('src/svg/', (err, files) => {
			files.forEach(file => {
				fsList.push(file.split('.').slice(0, -1).join('.'))
			});

			if (!fs.existsSync('dist/data/')) {
				fs.mkdirSync('dist/data/');
			}

			fs.appendFile('dist/data/data.json', JSON.stringify(fsList), function (err) {
				if (err) throw err;
			});
		});
		resolve();
	});
});

gulp.task('default', gulp.series(
	'clean',
	'icon',
	'css-min',
	'png',
	'json'
));
