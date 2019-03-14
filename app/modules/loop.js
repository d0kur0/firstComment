const log = require('./consoleLogs.js');
const { PendingXHR } = require('pending-xhr-puppeteer');

module.exports = async (page, process) => {

  await page.goto(process.watchUrl)
    .then(() => log.success('Страница, за которой нужно следить открыта'))
    .catch(() => log.error('Не удалось открыть страницу за которой нужно следить'));

  await page.mainFrame().waitForSelector('#page_wall_posts > div._post.post.page_block.all.own.deep_active')
    .then(() => log.info('Пост отрисовался'))
    .catch(() => log.error('Посты не были отрисованы'));

  let postId = await page.$eval('#page_wall_posts > div._post.post.page_block.all.own.deep_active', (el) => {
    return el.getAttribute('data-post-id');
  });

  log.success(postId);
  log.success(global._temp);
};
