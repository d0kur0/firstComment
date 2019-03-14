const chalk = require('chalk');

module.exports = {
  header (message) {
    console.log(chalk.magenta.bold(`\r\n➣ ${message} `))
  },

  info (message) {
    console.log(chalk.blue(`  ⮡ ${message} `))
  },

  success (message) {
    console.log(chalk.cyan(`  ⮡ ${message} `))
  },

  error (message) {
    console.log(chalk.red.bold(`  ⮡ ྾ ${message} `))
  }
};
