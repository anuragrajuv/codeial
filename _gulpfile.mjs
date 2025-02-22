import gulp from 'gulp';
import sassPkg from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rev from 'gulp-rev';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import * as dartSass from 'sass';

const sass = sassPkg(dartSass);

const manifestPath = './public/assets/rev-manifest.json';

gulp.task('css', function(done) {
    console.log('Minifying CSS...');
    console.log(`Manifest Path: ${manifestPath}`);
    
    gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/css'));

    return gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', function() {
    console.log('Minifying JS...');
    console.log(`Manifest Path: ${manifestPath}`);
    
    return gulp.src('./assets/**/*.js')
        .pipe(terser())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('images', function() {
    console.log('Compressing images...');
    console.log(`Manifest Path: ${manifestPath}`);
    
    return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
});

// Empty the public/assets directory
// Clean assets folder, including manifest
gulp.task('clean:assets', function() {
    console.log('Cleaning assets...');
    console.log(`Manifest Path: ${manifestPath}`);
    return deleteAsync(['./public/assets/**', `!${manifestPath}`]); // Keep manifest
});

// Define the build tasks separately
gulp.task('build', gulp.series('clean:assets', gulp.parallel('css', 'js', 'images')));
