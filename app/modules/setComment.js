const log = require('./consoleLogs.js');
const { PendingXHR } = require('pending-xhr-puppeteer');

module.exports = async (page, state, message) => {
  await page.mainFrame().waitForSelector('a.like_btn.comment._comment._reply_wrap.empty')
    .then(() => log.info('Кнопка открытия коментариев отрисована'))
    .catch(() => log.error('Кнопка для открытия комментариев не появилась'));

  const lastPost = state.getPost();

  const existsComments = await page.$(`#post${lastPost} .reply.reply_dived.clear.reply_replieable._post`);

  if (existsComments) {
    log.error('Пост новый, но комментарий уже успели оставить');
    return;
  } else {
    await page.click('a.like_btn.comment._comment._reply_wrap.empty');
    await page.focus('div.reply_field.submit_post_field')
      .then(async () => {
        await page.keyboard.type(message)
          .then(() => log.info('Печатаю комментарий'))
          .catch(() => log.error('Не удалось напечатать комментерий'));

        const pendingXHR = new PendingXHR(page);
        await page.click('div.reply_text_wrapper > button')
          .then(() => log.success('Отправляю комментарий'))
          .catch(() => log.error('Не удалось отправить комментарий'));

        await pendingXHR.waitForAllXhrFinished()
          .then(() => {
            log.info('Все XHR запросы завершены, комментарий оставлен');
          });
      });
  }
};
