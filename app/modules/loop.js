const log = require('./consoleLogs.js');
const { PendingXHR } = require('pending-xhr-puppeteer');
const setComment = require('./setComment.js');
const sleep = require('./sleep.js');

module.exports = async (page, process) => {

  await page.goto(process.watchUrl)
    .then(() => log.success('Страница, за которой нужно следить открыта'))
    .catch(() => log.error('Не удалось открыть страницу за которой нужно следить'));

  await page.mainFrame().waitForSelector('._post.post.page_block.all.own.deep_active')
    .then(() => log.info('Пост отрисовался'))
    .catch(() => log.error('Посты не были отрисованы'));

  const lastPost = await page.evaluate(() => {
    const post = document.querySelector('._post.post.page_block.all.own.deep_active');

    return post.getAttribute('data-post-id');
  });

  // Первый запуск, получает ID последнего поста
  if (global._temp.lastPost === 0) {
    global._temp.lastPost = lastPost;
    log.info('Первый запуск, берём последний ID и завершаем итерацию');
    return;
  }

  if (global._temp.lastPost !== lastPost) {
    global._temp.state = false;
  }

  if (global._temp.lastPost !== lastPost && !global._temp.state) {
    await setComment(page);
    global._temp.state = true;
  } else {
    log.info('Ничего нового');
  }
};
