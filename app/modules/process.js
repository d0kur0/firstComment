const puppeteer = require('puppeteer');
const browserSettings = require('../configs/browserSettings.js');
const log = require('./consoleLogs.js');
const auth = require('./auth.js');

module.exports = async () => {
  const browser = await puppeteer.launch(browserSettings);
  const page = await browser.newPage();

  await auth(page);
};
