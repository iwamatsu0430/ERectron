var gulp      = require("gulp");
var del       = require('del');
var tsc       = require("gulp-typescript");
var sass      = require("gulp-sass");
var sequence  = require('run-sequence');

var typescriptFiles = ["src/*.ts", "src/**/*.ts"];
var sassFiles       = ["sass/*.scss", "sass/**/*.scss"];

gulp.task("default", function() {
  return sequence(
    "bower-css",
    "bower-fonts",
    "bower-js",
    "clean",
    "typescript",
    "sass"
  );
});

gulp.task("watch", function() {
  gulp.watch(typescriptFiles, function() {
    return sequence(
      "clean",
      "typescript"
    );
  });
  gulp.watch(sassFiles, function() {
    return sequence(
      "sass"
    );
  });
})

gulp.task("bower-js", function() {
  return gulp.src([
    "bower_components/riot/riot.js",
    "bower_components/riot/compiler.js",
    "bower_components/riot-ts/riot-ts.js"
  ]).pipe(gulp.dest("app/assets/javascripts/vendor"));
});

gulp.task("bower-css", function() {
  return gulp.src([
    "bower_components/normalize.css/normalize.css",
    "bower_components/fontawesome/css/font-awesome.css",
  ]).pipe(gulp.dest("app/assets/stylesheets/vendor"));
});

gulp.task("bower-fonts", function() {
  return gulp.src([
    "bower_components/fontawesome/fonts/*"
  ]).pipe(gulp.dest("app/assets/stylesheets/fonts"));
});

gulp.task('clean', function() {
  return del([
    "app/assets/javascripts/app/*"
  ]);
});

gulp.task("typescript", function() {
  return gulp.src(typescriptFiles)
    .pipe(tsc({
      noImplicitAny: true,
      removeComments: true,
      out: 'riot-components.js'
    }))
    .pipe(gulp.dest("app/assets/javascripts/app"));
});

gulp.task("sass", function() {
  return gulp.src(sassFiles)
    .pipe(sass())
    .pipe(gulp.dest("app/assets/stylesheets/app"));
});
