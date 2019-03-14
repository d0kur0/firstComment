const log = require('./consoleLogs.js');

module.exports = {
  setPost (post) {
    this.post = post;
    this.state = false;
  },

  getPost () {
    return this.post;
  },

  setState () {
    this.state = true;
  },

  getState () {
    return this.state;
  }
};
