const crypto = require('crypto');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const str = 'qwertyuiopasdfghjklzxcvbnm1234567890';
const len = str.length;

// Schema
const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  pass: {
    type: String
  },
  salt: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.static('findId', function (id, cb) {
  return this.findOne({ _id: id }, cb);
})

UserSchema.static('store', function (doc, cb) {
  let salt = '',
    ind = 0,
    pass = doc.pass;
  while (ind <= 11) {
    ++ind;
    salt += str.charAt(Math.floor(Math.random() * len));
  }
  doc.salt = salt;
  const hmac = crypto.createHmac('md5', salt);
  doc.pass = hmac.update(pass).digest('hex');
  this.create(doc, (err, _user) => {
    if (err) {
      console.error(err);
      return cb(`create err.`)
    }
    cb(null, _user);
  })
})

UserSchema.static('read', function (doc, cb) {
  this.findOne({
    name: doc.name
  }, (err, _user) => {
    if (err) {
      console.error(err);
      // 查询出错
      return cb(new Error(`find error.`));
    }
    if (!_user) {
      // 用户名没找到
      return cb(new Error(`name error.`));
    }
    const hmac = crypto.createHmac('md5', _user.salt);
    let pass = hmac.update(doc.pass).digest('hex');
    if (pass === _user.pass) {
      return cb(null, _user);
    }
    cb(new Error(`pass error.`));
  })
})

// Model
const UserModel = mongoose.model('UserModel', UserSchema, 'users');

module.exports = UserModel;
