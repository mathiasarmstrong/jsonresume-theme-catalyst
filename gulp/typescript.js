import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';

// TODO: move this into the current folder
const tsProject = ts.createProject('tsconfig.json',{
  // declaration: true,
  // output: 'resume.js'
});

export const compileTypescript = () => {
  return gulp.src('app/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'));
}

gulp.task('typescript', compileTypescript);

export default compileTypescript;
