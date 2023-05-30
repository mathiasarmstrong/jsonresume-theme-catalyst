import gulp from 'gulp'
import browserSync from 'browser-sync';
import tasks from './gulp/index.js';

const bs = browserSync.create("resume");

// @ts-ignore
const reload = done => {
  bs.reload();
  done();
}

const watch = () => {
  gulp.watch(
    (process.env.CATALYST_RESUME_ASSETS_DIR + '/images/**/*') || 'resume-assets/images/**/*',
    gulp.series(tasks.images, gulp.parallel(tasks.pdf, reload))
  );
  gulp.watch('app/styles/**/*.scss', gulp.series(tasks.styles, gulp.parallel(tasks.pdf, reload)));
  gulp.watch(
    [
      'app/views/**/*.pug',
      (process.env.CATALYST_RESUME_ASSETS_DIR + '/data/resume.yml') || 'resume-assets/data/resume.yml',
      'app/utils.js'
    ],
    gulp.series(tasks.resume, gulp.parallel(tasks.pdf, reload))
  );
  gulp.watch('app/**/*.ts', gulp.series(tasks.typescript, reload));
};

// @ts-ignore
const serve = (done) => {
  bs.init({
    server: './public',
    index: 'resume.html'
  });
  done()
}

const dev = gulp.series(tasks.build, serve, watch);

gulp.task('default', dev);
gulp.task('dev', dev);
