import gulp from 'gulp';

export const dotfiles = async () => {
  return await new Promise((resolve, reject) => {
    gulp.src([
      'app/*.*'
    ], {
      dot: true
    }).pipe(gulp.dest('public'))
      .on('finish', resolve)
      .on('error', reject);
  })
}

gulp.task('dotfiles', dotfiles);

export default dotfiles;
