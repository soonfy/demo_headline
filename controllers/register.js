const UserModel = require('../models/user');

const form = (req, res, next) => {
  res.render('register', {
    title: '用户注册'
  });
}

const submit = (req, res, next) => {
  let user = req.body;
  UserModel.store(user, (err, doc) => {
    if (err) {
      console.error(err);
      res.error('用户名已存在。');
      res.redirect('back');
    } else {
      req.session.uid = doc._id;
      req.session.name = doc.name;
      res.locals.user = doc;
      res.redirect('/index.html');
    }
  })
}

module.exports = {
  form,
  submit
}
