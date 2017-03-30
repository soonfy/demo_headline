var express = require('express');
var router = express.Router();

const register = require('../controllers/register');
const login = require('../controllers/login');
const news = require('../controllers/news');
const validate = require('../controllers/validate');

router.get('/register.html', register.form);
router.post('/register.html', register.submit);

router.get('/login.html', login.form);
router.post('/login.html', login.submit);
router.get('/logout.html', login.logout);


router.get('/post.html', news.form);
router.post('/post.html', validate.required('title'), validate.maxLength('title', 20), news.submit);

module.exports = router;
