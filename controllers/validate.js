const required = (field) => {
  return (req, res, next) => {
    if (req.body[field]) {
      return next();
    } else {
      res.error(`${field} is required.`);
      res.redirect('back');
    }
  }
}

const maxLength = (field, len) => {
  return (req, res, next) => {
    if (req.body[field].length <= len) {
      return next();
    } else {
      res.error(`${field} less ${len}.`);
      res.redirect('back');
    }
  }
}

module.exports = {
  required,
  maxLength
}
