import gulp from 'gulp';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from "gulp-imagemin";
import cache from "gulp-cache";
import gulpSize from "gulp-size";
import debug from "gulp-debug";

const imageMinOptions = [
  gifsicle({interlaced: true}),
  mozjpeg({quality: 75, progressive: true}),
  optipng({optimizationLevel: 5}),
  svgo({
    plugins: [
      { name: 'removeViewBox', active: true },
			{ name: 'cleanupIDs', active: false }
    ]
  })
]

export const imagesPath = (override => {
  const root = override || './resume-assets';
  return root + '/images/**/*';
})(process.env.CATALYST_RESUME_ASSETS_DIR)

export const images = async () =>
  new Promise((resolve, reject) => {

    console.log("**************************************")
    console.log("Resume ENV Variables")
    console.log(`CATALYST_RESUME_ASSETS_DIR: ${process.env.CATALYST_RESUME_ASSETS_DIR || 'NOT SET'}`)
    console.log(`USING RESUME IMAGES FROM: ${imagesPath}`)
    console.log("**************************************")


    return gulp.src(imagesPath)
      .pipe(gulpSize())
      .pipe(cache(imagemin(imageMinOptions)))
      // .pipe(imagemin(imageMinOptions))
      .pipe(gulpSize())
      .pipe(gulp.dest('public/images'))
      .on('finish', resolve)
      .on('error', reject)
  });

gulp.task('images', images);

export default images;
