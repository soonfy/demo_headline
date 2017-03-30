const express = require('express');
let res = express.response;

res.message = function(msg, type = 'info') {
  let sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push({ type, text: msg });
}

res.error = function (msg) {
  return this.message(msg, 'error');
}

module.exports = (req, res, next) => {
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = () => {
    req.session.messages = [];
  }
  next();
}
