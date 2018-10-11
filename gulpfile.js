'use strict';

let gulp = require('gulp'),
	iconfont = require('gulp-iconfont'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	consolidate = require('gulp-consolidate');

// clean dist folder before build
gulp.task('clean', () => {
	return gulp.src('dist/*')
		.pipe(clean({
			force: true
		}));
});

// generate icon fonts  from svg
gulp.task('icon', function () {
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


gulp.task('default', gulp.series(
	'clean',
	'icon',
	'css-min'
));
