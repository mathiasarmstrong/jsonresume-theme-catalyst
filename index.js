import fs from 'fs'
import pug from 'pug';
import { formatDate } from './app/utils';

let publicDir = __dirname + '/public',
  resumeTemplate = fs.readFileSync('app/views/index.pug', 'utf-8');

const pugOptions = {
  filename: 'app/views/resume.pug'
};

// I want this to run the gulp task instead, that will generate the 'stuff' for the
// resume-cli backwards compatibility
export const render = (resume, compiler = pug) => {

  return compiler.compile(resumeTemplate, pugOptions)({
    resume: resume,
    formatDate: formatDate
  });
}

export default {
  render,
}


// module.exports = {
//   render: render,
//   pugOptions,
//   publicDir
// };
