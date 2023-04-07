const gulp = require("gulp");
const less = require("gulp-less");
const foreach = require("gulp-foreach");
const cleanCSS = require("gulp-clean-css");
const watch = require("gulp-watch");
const livereload = require("gulp-livereload");

const destPath = "./pub/css";
const srcPath = "./source/less";

gulp.task("less-pages", function () {
    return gulp
        .src(`${srcPath}/index.less`)
        .pipe(livereload())
        .pipe(
            foreach(function (stream, file) {
                return stream
                    .pipe(less())
                    .pipe(cleanCSS())
                    .pipe(gulp.dest(destPath));
            })
        );
});

gulp.task("build", gulp.series("less-pages"));

gulp.task("watch", function () {
    livereload.listen();
    return watch([`./source/less/**/*.less`, 'pub/index.html'], gulp.series("less-pages"));
});

function catchErr(e) {
    console.log(e.messageFormatted);
    this.emit("end");
}