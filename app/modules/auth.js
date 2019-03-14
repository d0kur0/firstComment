const log = require('./consoleLogs.js');
const authData = require('../configs/authData.js');
const { PendingXHR } = require('pending-xhr-puppeteer');

module.exports = async (page) => {
  log.header('Начинаю авторизацию...');

  await page.goto('https://vk.com')
    .then(() => log.success('Успешно открыл главную ВК'))
    .catch(() => log.error('Не удалось открыть главную Вк'));

  await page.mainFrame().waitForSelector('#index_email')
    .then(async () => {
      log.info('Поле ввода логина отрендерилась');

      await page.focus('#index_email');
      await page.keyboard.type(authData.username)
        .then(() => log.info('Поле ввода логина успешно заполнено'))
        .catch(() => log.info('Не удалось заполнить поле ввода логина'));
    })
    .catch(() => log.error('Поле ввода логина не было отрендерено'));

  await page.mainFrame().waitForSelector('#index_pass')
    .then(async () => {
      log.info('Поле ввода пароля отрендерилась');

      await page.focus('#index_pass');
      await page.keyboard.type(authData.password)
        .then(() => log.info('Поле ввода пароля успешно заполнено'))
        .catch(() => log.error('Не удалось заполнить поле ввода пароля'));
    })
    .catch(() => log.error('Поле ввода пароля не было отрендерено'));

  const pendingXHR = new PendingXHR(page);
  await page.click('#index_login_button')
    .then(() => log.success('Нажимаю кнопку авторизации'))
    .catch(() => log.error('Не удалось нажать кнопку авторизации'));

  await pendingXHR.waitForAllXhrFinished()
    .then(() => {
      log.info('Все XHR запросы завершены');
    });

  await page.mainFrame().waitForSelector('#l_pr > a > span > span.left_label.inl_bl')
    .then(() => log.info('Жду рендеринга ВК после редиректа'))
    .catch(() => log.error('Страница ВК не была отрендерена'));

  const existsMyPageLink = await page.$('#l_pr > a > span > span.left_label.inl_bl');

  if (existsMyPageLink) {
    log.success('Авторизация прошла успешно');
    return true;
  } else {
    log.error('Авторизация не удалась');
    return false;
  }
};
