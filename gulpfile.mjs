import gulp from 'gulp';
import sassPkg from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rev from 'gulp-rev';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import * as dartSass from 'sass';
// import del from "del";


const sass = sassPkg(dartSass);


gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/**/*.css')
    .pipe(cleanCSS())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(terser())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(){
    return deleteAsync(["public/assets/**", "public/assets"], { force: true });
});

gulp.task('build', gulp.series('clean:assets', gulp.series('css', 'js', 'images')), function(done){
    console.log('Building assets');
    done();
});