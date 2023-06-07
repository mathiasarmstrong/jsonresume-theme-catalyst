import gulp from 'gulp';
import fs from 'fs';
import gulpPug from 'gulp-pug';
import gulpSize from 'gulp-size';
import plumber from "gulp-plumber";
import * as utils from '../app/pug_utils.js';
import * as YAML from "yaml";

export const resume = async () => {
  let fileData, resume;

  console.log("**************************************")
  console.log("Resume ENV Variables")
  console.log(`CATALYST_RESUME_ASSETS_DIR: ${process.env.CATALYST_RESUME_ASSETS_DIR || 'resume-assets/'}`)
  console.log("**************************************")

  // TODO: make this work for both yaml|yml and json
  if (fs.existsSync(process.env.CATALYST_RESUME_ASSETS_DIR + '/data/resume.yml' || 'resume-assets/data/resume.yml')) {
    console.log("Using resume.yml")
    fileData = fs.readFileSync(process.env.CATALYST_RESUME_ASSETS_DIR + '/data/resume.yml' || 'resume-assets/data/resume.yml', 'utf8')
    resume = YAML.parse(fileData);
  } else {
    console.log("Using resume-sample.json")
    fileData = fs.readFileSync('resume-assets/data/resume-sample.yml')
    resume = YAML.parse(fileData);
  }

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
