var express = require('express');
var router = express.Router();

const news = require('../controllers/news');

router.get('/', news.list);
router.get('/index.html', news.list);
router.get('/append', news.append);


module.exports = router;
