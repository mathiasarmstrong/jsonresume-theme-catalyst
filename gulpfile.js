import gulp from 'gulp'
import browserSync from 'browser-sync';
import tasks from './gulp/index.js';

const build = gulp.series(tasks.clean, gulp.parallel(tasks.styles, tasks.images, tasks.dotfiles, gulp.series(tasks.resume, tasks.pdf)));

gulp.task('build', build);

const bs = browserSync.create("resume");

const reload = done => {
  bs.reload();
  done();
}

const watch = () => {
  gulp.watch(
    process.env.CATALYST_RESUME_ASSETS_DIR + '/images/**/*' || 'resume-assets/images/**/*',
    gulp.series(tasks.images, gulp.parallel(tasks.pdf, reload))
  );
  gulp.watch('app/styles/**/*.scss', gulp.series(tasks.styles, gulp.parallel(tasks.pdf, reload)));
  gulp.watch(
    [
      'app/views/**/*.pug',
      process.env.CATALYST_RESUME_ASSETS_DIR + '/data/resume.yml' || 'resume-assets/data/resume.yml',
      'app/utils.js'
    ],
    gulp.series(tasks.resume, gulp.parallel(tasks.pdf, reload))
  );
};

const serve = (done) => {
  bs.init({
    server: './public',
  });
  done()
}

const dev = gulp.series(build, serve, watch);

gulp.task('default', dev);
gulp.task('dev', dev);
