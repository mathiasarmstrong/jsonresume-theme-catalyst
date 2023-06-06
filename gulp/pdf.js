import tap from "gulp-tap";
import puppeteer from "puppeteer";
import gulp from "gulp";
import path from "path";

export const htmlToPdf = async () =>
  new Promise((resolve, reject) => gulp.src("public/resume.html")
    .pipe(tap(async (file) => {
      const browser = await puppeteer.launch({headless: "new"});
      const page = await browser.newPage();
      await page.goto("file://" + file.path);
      await page._client().send('Animation.setPlaybackRate', { playbackRate: 5 });

      // https://pptr.dev/api/puppeteer.pdfoptions
      await page.pdf({
        path: 'public/' + path.basename(file.basename, ".html") + ".pdf",
        // printBackground: true,
        // omitBackground: true,
        format: 'Letter'
      });

      //  I also want a png for my own use, this is embedded into my portfolio site as the link
      await page.setViewport({
        width: 612,
        height: 800,
        deviceScaleFactor: .85,
      });
      await page.screenshot({ path: 'public/' + path.basename(file.basename, ".html") + ".png" });

      await browser.close();
      resolve();
    }))
    .on('error', reject))


//
gulp.task('pdf', htmlToPdf);

export default htmlToPdf;
