const puppeteer = require("puppeteer");
function run() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("reached");
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto("https://boards.greenhouse.io/upwork/jobs/5271192003");
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll("input");
        items.forEach((item) => {
          results.push({
            id: item.getAttribute("id"),
            text: item.innerText,
          });
        });
        return results;
      });
      browser.close();
      console.log("working...");
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
}
run().then(console.log).catch(console.error);
