import gulp from 'gulp';
import { deleteAsync } from 'del';

export const clean = async () => await deleteAsync(['public']);

gulp.task('clean', clean);

export default clean;
