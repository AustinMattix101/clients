const { series, parallel, src, dest, task } = require('gulp');
var cleanfs = require('gulp-clean');
const uglifycss = require('gulp-uglifycss');
// const sass = require('gulp-sass')(require('sass'));
// const babel = require('gulp-babel');

// task('babel', () =>
//   src('src/app.js')
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(dest('dist'))
// );


async function clean() {
  return src('./dist/**.*', {read: false})
    .pipe(cleanfs());
}

async function minify () {
    return src('./src/**/*.css')
      .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(dest('./dist'));
  };

// async function buildStyles () {
//   return src('./src/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(dest('./dist/scss'));
// }

exports.build = parallel(minify);
exports.default = series(clean, parallel(minify));