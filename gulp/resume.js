import gulp from 'gulp';
import fs from 'fs';
import gulpPug from 'gulp-pug';
import gulpSize from 'gulp-size';
import plumber from "gulp-plumber";
import * as utils from '../app/pug_utils.js';
import * as YAML from "yaml";
// import memo from 'lodash';

const resumePathWithinAssetsDir =  '/data/resume.yml';

const getResumeYmlPath = () => {
  if (process.env.CATALYST_RESUME_ASSETS_DIR
      && fs.existsSync(process.env.CATALYST_RESUME_ASSETS_DIR + resumePathWithinAssetsDir)
  ){
    return process.env.CATALYST_RESUME_ASSETS_DIR + resumePathWithinAssetsDir
  } else {
    return `./resume-assets${resumePathWithinAssetsDir}`
  }
}

export const resumePath = getResumeYmlPath();

const getResumeData = (path) => {
  const file = fs.readFileSync(path, "utf8")
  return YAML.parse(file);
}

export const resume = async () => {

  const resumePath = getResumeYmlPath();

  console.log("**************************************")
  console.log("Resume ENV Variables")
  console.log(`CATALYST_RESUME_ASSETS_DIR: ${process.env.CATALYST_RESUME_ASSETS_DIR || 'NOT SET'}`)
  console.log(`USING RESUME.YML FROM: ${resumePath}`)
  console.log("**************************************")

  const resume = getResumeData(getResumeYmlPath());

  return new Promise((resolve, reject) => {
    gulp.src('./app/views/*.pug')
      .pipe(plumber(error => {
        console.log(error);
        reject(error)
      }))
      .pipe(
        gulpPug({
          locals: {
            resume,
            ...utils
          },
          pretty: true,
          compileDebug: true,
          verbose: true
        })
      )
      .pipe(gulp.dest('public/'))
      .on('finish', async (...args) => {
        gulp.src('public/**/*').pipe(gulpSize({
          title: 'build',
          gzip: true
        }));
        resolve(...args)
      })
      .on('error', reject);
  })
};
//  NOTE If we do PDF here that will delay the reload of the HTML, which is a bit undesirable
gulp.task('resume', resume);

export default resume
