const puppeteer = require('puppeteer');
const browserSettings = require('../configs/browserSettings.js');
const auth = require('./auth.js');
const process = require('../configs/process.js');
const loop = require('./loop.js');
const sleep = require('./sleep.js');

module.exports = async () => {
  const browser = await puppeteer.launch(browserSettings);
  const page = await browser.newPage();

  await auth(page);

  while (true) {
    try {
      await loop(page, process);
      await sleep(process.delay);
    } catch (Exception) {
      continue;
    }
  }
};
