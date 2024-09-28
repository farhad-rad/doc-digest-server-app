const gulp = require("gulp");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const copy = require("gulp-copy");
const tsProject = ts.createProject("tsconfig.json");
const fs = require("fs");
const run = require("gulp-run");

gulp.task("clear", function () {
  if (fs.existsSync("dist")) {
    return gulp.src(".").pipe(run("rm -rf ./dist"));
  }
  return gulp.src(".");
});

gulp.task("tsc", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

gulp.task("copy-assets", function () {
  return gulp.src("public/**/*").pipe(copy("dist", { prefix: 0 }));
});

gulp.task("node-modules", function () {
  const json = JSON.parse(fs.readFileSync("package.json").toString());
  const { scripts: _1, devDependencies: _2, ...newJson } = json;
  fs.writeFileSync("dist/package.json", JSON.stringify(newJson), {
    flag: "w+",
  });
  return gulp.src(".").pipe(run("cd dist && npm install"));
});

gulp.task("build", gulp.series("clear", "tsc", "copy-assets", "node-modules"));
