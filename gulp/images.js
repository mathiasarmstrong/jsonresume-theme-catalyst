import gulp from 'gulp';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from "gulp-imagemin";
import cache from "gulp-cache";

const imageMinOptions = [
  // gifsicle({interlaced: true}),
  // mozjpeg({quality: 75, progressive: true}),
  // optipng({optimizationLevel: 5}),
  // svgo({
  //   plugins: [
  //     {removeViewBox: true},
  //     {cleanupIDs: false}
  //   ]
  // })
]

export const images = async () =>
  new Promise((resolve, reject) =>
    gulp.src(process.env.CATALYST_RESUME_ASSETS_DIR + '/images/**/*' || 'asresume-assets/images/**/*')
      .pipe(cache(imagemin(imageMinOptions)))
      // .pipe(imagemin(imageMinOptions))
      .pipe(gulp.dest('public/images'))
      .on('finish', resolve)
      .on('error', reject)
  );

gulp.task('images', images);

export default images;
