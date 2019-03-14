const puppeteer = require('puppeteer');
const browserSettings = require('../configs/browserSettings.js');
const log = require('./consoleLogs.js');
const auth = require('./auth.js');
const process = require('../configs/process.js');
const loop = require('./loop.js');
const sleep = require('./sleep.js');

module.exports = async () => {
  const browser = await puppeteer.launch(browserSettings);
  const page = await browser.newPage();

  await auth(page);

  let recursionCall = async () => {
    await loop(page, process);
    await sleep(process.delay);

    await recursionCall();
  };

  await recursionCall();
};
