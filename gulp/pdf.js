import tap from "gulp-tap";
import puppeteer from "puppeteer";
import gulp from "gulp";
import path from "path";

function delay(time) {
   return new Promise(function(resolve) {
       setTimeout(resolve, time)
   });
}

export const htmlToPdf = async () =>
  new Promise((resolve, reject) => gulp.src("public/index.html")
    .pipe(tap(async (file) => {
      const browser = await puppeteer.launch({headless: "new"});
      const page = await browser.newPage();
      // await page.setViewport({
      //     width: 1200,
      //     height: 600,
      //     deviceScaleFactor: 1,
      // });
      await page.goto("file://" + file.path);
      // await page.screenshot({ path: path.basename(file.basename, ".html") + ".png" });
      // https://pptr.dev/api/puppeteer.pdfoptions

      // TODO: at some point change this to load it with animation off
      // await page._client().send('Animation.setPlaybackRate', { playbackRate: 2 });
      await delay(5000);

      await page.pdf({
        path: 'public/' + path.basename(file.basename, ".html") + ".pdf",
        // printBackground: true,
        // omitBackground: true,
        format: 'Letter'
      });
      await browser.close();
      resolve();
    }))
    .on('error', reject))


gulp.task('pdf', htmlToPdf);

export default htmlToPdf;
