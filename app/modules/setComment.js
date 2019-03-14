const log = require('./consoleLogs.js');
const { PendingXHR } = require('pending-xhr-puppeteer');

module.exports = async (page) => {
  await page.mainFrame().waitForSelector('a.like_btn.comment._comment._reply_wrap.empty > div.like_button_icon')
    .then(() => log.info('Кнопка открытия коментариев отрисована'))
    .catch(() => log.error('Кнопка для открытия комментариев не появилась'));

  const lastPost = global._temp.lastPost;

  // Проверка, есть ли уже комментарии
  const existsComments = await page.$(`#post${lastPost} .reply.reply_dived.clear.reply_replieable._post`);

  if (existsComments) {
    log.error('Пост новый, но комментарий уже успели оставить');
    return;
  } else {
    log.success('Успели! Новый пост - первый комментарий');
  }
};
