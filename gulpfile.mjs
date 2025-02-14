import gulp from 'gulp';
import sassPkg from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import * as dartSass from 'sass';
import rev from 'gulp-rev';

const sass = sassPkg(dartSass);

// Paths
const paths = {
    styles: {
        src: './assets/scss/**/*.scss',
        dest: './public/assets/css/'
    },
    scripts: {
        src: './assets/js/**/*.js',
        dest: './public/assets/js/'
    },
    images: {
        src: './assets/images/**/*.+(img|jpeg|jpg|png|gif|webp|tiff|eps|bmp)',
        dest: './public/assets/images/'
    }
};

// Compile SCSS, minify CSS, add hash
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(paths.styles.dest));
}

// Minify JS, add hash
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(terser())
        .pipe(rev())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Optimize Images
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Clean Assets
async function cleanAssets() {
    await deleteAsync(['./public/assets']);
}

// Watch files
function watchFiles() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

// Default task
export default gulp.series(cleanAssets, gulp.parallel(styles, scripts, images));