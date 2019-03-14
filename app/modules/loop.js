const log = require('./consoleLogs.js');
const { PendingXHR } = require('pending-xhr-puppeteer');
const setComment = require('./setComment.js');
const state = require('./postState.js');

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

  const firstState = state.getPost();
  if (firstState !== lastPost) {
    state.setPost(lastPost);

    if (firstState === undefined) {
      return log.info('Первый запуск, берём последний ID и завершаем итерацию');
    }
  }

  if (firstState !== lastPost && !state.getState()) {
    await setComment(page, state, process.message);
    state.setState();
  } else {
    log.info('Ничего нового');
  }
};
