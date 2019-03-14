const log = require('./consoleLogs.js');

module.exports = {
  setPost (post) {
    log.success(`setPost::${post}`);
    this.post = post;
    this.state = false;
  },

  getPost () {
    log.success(`getPost::${this.post}`);
    return this.post;
  },

  setState () {
    this.state = true;
    log.success(`setState::${this.state}`);
  },

  getState () {
    log.success(`getState::${this.state}`);
    return this.state;
  }
};
