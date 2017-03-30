const UserModel = require('../models/user');

const form = (req, res, next) => {
  res.render('login', {
    title: '用户登录'
  });
};

const submit = (req, res, next) => {
  let user = req.body;
  UserModel.read(user, (err, doc) => {
    if (err) {
      console.error(err);
      res.error('用户名或者密码错误。');
      res.redirect('back');
    } else {
      console.log(`doc`);
      console.log(doc);
      req.session.uid = doc._id;
      req.session.name = doc.name;
      res.locals.user = doc;
      res.redirect('/index.html');
    }
  });
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.error('未注销成功。');
      res.redirect('back');
    }
    res.redirect('/index.html');
  });
};

module.exports = {
  form,
  submit,
  logout
};
