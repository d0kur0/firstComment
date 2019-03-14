# FirstComment

![Процесс работы програмы](https://pp.userapi.com/c845120/v845120637/1c441b/eYAJJbcN8i8.jpg)

FirstComment - бот для vk.com, написанный на JavaScript c использованием headless браузера [Pupetteer](https://github.com/GoogleChrome/puppeteer).
Логика работы бота простая, всё, что ему нужно указать: данные от аккаунта под которым он будет логиниться, адрес группы, стену которой он будет вотчить.
По умолчанию проверяет раз в 4 сек. (Изменяемо в файле конфигурации). Если на момент открытия страницы кто-то уже успел написать комментерий к новой записи на стене - пропустит запись. (Ничего сам писать не будет)

## Зависимости
NodeJS >= 8

## Установка

Клонирование репозитория

```bash
git clone git@github.com:d0kur0/firstComment.git
```

Установка всех зависимостей 

```bash
npm i
```

## Настройки

Все настройки находятся в папке ```app/configs```

#### ```app/configs/authData.js```
```js
module.exports = {
  // Логин для авторизации
  username: "+79961826173",
  // Пароль для авторизации
  password: "firstCommentDevelop"
};
```

#### ```app/configs/browserSettings.js```
Этот объект полностью передаётся в конструктор создания сессии в браузере, можно указать валидные настройки из [документации к Pupetteer](https://github.com/GoogleChrome/puppeteer/blob/v1.13.0/docs/api.md#puppeteerlaunchoptions)
```js
module.exports = {
  ignoreHTTPSErrors: true,
  headless: false,
  args: [`--window-size=800,600`]
};
```

#### ```app/configs/process.js```
```js
module.exports = {
  // Адрес страницы сообщества, стену которой нужно вотчить
  watchUrl: 'https://vk.com/club179612809',
  // Пауза между проверками стены (мс)
  delay: 4000,
  // Сообщение в случае, если первый
  message: "first"
};
```

## Запуск
Запуск бота проводится из корня проекта, достаточно выполнить
```bash
npm app/process.js
```
