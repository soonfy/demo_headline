const UserModel = require('../models/user');

module.exports = (req, res, next) => {
  let uid = req.session.uid;
  if (!uid) {
    return next();
  } else {
    UserModel.findId(uid, (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = res.locals.user = user;
      next();
    })
  }
}
