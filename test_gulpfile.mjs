import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass"; // Import Dart Sass
import cleanCSS from "gulp-clean-css";
import rev from "gulp-rev";

// Set gulp-sass to use Dart Sass
const sass = gulpSass(dartSass);

gulp.task("css", function () {
    console.log("Minifying CSS...");

    gulp.src("./assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./assets/css"))

    return gulp.src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev.manifest({
        cwd: "public",
        merge: true
    }))
    .pipe(gulp.dest("./public/assets"));
});
