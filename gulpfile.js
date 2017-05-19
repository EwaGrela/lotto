var gulp = require('gulp');

//var jshint = require("gulp-jshint");

var sass =require("gulp-sass");

var browserSync= require("browser-sync").create();

var sourcemaps = require('gulp-sourcemaps');

//zadanie do kompilacji sassa do css to compileSass
//ctr c wpisz po zadaniu watch, żeby przerwać działanie


gulp.task("zadanie", function() {
	console.log("melduję wykonanie zadania");
});

gulp.task("pranie", function(){
	console.log("robię pranie");
});

gulp.task("pokolorujDrwala", function(){
	console.log("pokoloruj drwala używając JS");
});


/*
gulp.task("zadanie2", function(){
	return gulp.src('js/*.js')
	.pipe(jshint())	
	.pipe(jshint.reporter('default'))
});
*/

gulp.task('compileSass', function() {
	return gulp.src('scss/**/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		//errLogToConsole: true,
		outputStyle: "expanded"
	}).on('error',sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('css'))
});

gulp.task("watch", function() {
	gulp.watch('scss/*.scss', ['compileSass']);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	
});

gulp.task("serve", ['compileSass'], function() {
    browserSync.init({
        server: "./"
    });
	gulp.watch('scss/**/*.scss', ['compileSass']).on("change", browserSync.reload);
	gulp.watch('**/*.html').on("change", browserSync.reload);
	//gulp.watch('**/*.js').on("change", browserSync.reload);
});

