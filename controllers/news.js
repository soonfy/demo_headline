const moment = require('moment');
moment.locale('zh-cn');

const request = require('request');
const NewsModel = require('../models/news');

const tags = ['__all__', 'news_hot', 'news_society', 'news_entertainment', 'news_tech', 'news_sports'];

const list = (req, res, next) => {
  // 读数据库
  // let doc = {
  //   skip: 0,
  //   limit: 10
  // };
  // NewsModel.read(doc, (err, news) => {
  //   news = news.map(_news => {
  //     _news.date = moment(_news.published.getTime()).fromNow();
  //     return _news;
  //   })
  //   res.render('index', {
  //     title: '头条首页',
  //     news
  //   });
  // })
  // 实时头条数据
  let tag = tags[Math.floor(Math.random() * tags.length)];
  let uri = `http://www.toutiao.com/api/pc/feed/?category=${tag}&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A1B5387DFBBE5DE&cp=58DB3E951DCE0E1`;
  let opts = {
    method: 'GET',
    uri,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36',
      'Cookie': 'uuid="w:f49cc075523f46ba9425a340ca40f853"; UM_distinctid=15b14c274377ca-0dc7b20de7d81c-396f7b07-1fa400-15b14c2744b619; tt_webid=57135256118; csrftoken=8c885544832f8cc39d85a7dd49979df3; CNZZDATA1259612802=1733940989-1490698472-https%253A%252F%252Fwww.bing.com%252F%7C1490803236; _ga=GA1.2.1515511214.1490701940; __tasessionId=u08gla6mz1490806054394',
      'Host': 'www.toutiao.com'
    }
  }
  console.log(uri);
  request(opts, (err, response) => {
    if (!err && response.statusCode === 200) {
      let data = JSON.parse(response.body).data;
      console.log(`头条采集到${data.length}条数据。`);
      let news = data.map(_news => {
        _news.uri = _news.source_url ? `http://www.toutiao.com${_news.source_url}` : _news.group_id ? `http://www.toutiao.com/a${_news.group_id}/` : 'http://www.toutiao.com';
        _news.userName = _news.source || '';
        _news.userUri = _news.media_url ? `http://www.toutiao.com${_news.media_url}` : 'http://www.toutiao.com';
        _news.content = _news.abstract || ``;
        _news.tag = _news.chinese_tag || `推荐`;
        _news.img = _news.image_url || '';
        _news.comment = _news.comments_count || '';
        return _news;
      })
      res.render('index', {
        title: '头条首页',
        news
      });
    } else {
      console.error(err);
      console.error(response.statusCode);
    }
  })
}

const append = (req, res, next) => {
  // 实时追加头条数据
  let tag = tags[Math.floor(Math.random() * tags.length)];
  let uri = `http://www.toutiao.com/api/pc/feed/?category=${tag}&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A1B5387DFBBE5DE&cp=58DB3E951DCE0E1`;
  let opts = {
    method: 'GET',
    uri,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36',
      'Cookie': 'uuid="w:f49cc075523f46ba9425a340ca40f853"; UM_distinctid=15b14c274377ca-0dc7b20de7d81c-396f7b07-1fa400-15b14c2744b619; tt_webid=57135256118; csrftoken=8c885544832f8cc39d85a7dd49979df3; CNZZDATA1259612802=1733940989-1490698472-https%253A%252F%252Fwww.bing.com%252F%7C1490803236; _ga=GA1.2.1515511214.1490701940; __tasessionId=u08gla6mz1490806054394',
      'Host': 'www.toutiao.com'
    }
  }
  console.log(uri);
  request(opts, (err, response) => {
    if (!err && response.statusCode === 200) {
      let data = JSON.parse(response.body).data;
      console.log(`头条采集到${data.length}条数据。`);
      let news = data.map(_news => {
        _news.uri = _news.source_url ? `http://www.toutiao.com${_news.source_url}` : _news.group_id ? `http://www.toutiao.com/a${_news.group_id}/` : 'http://www.toutiao.com';
        _news.userName = _news.source || '';
        _news.userUri = _news.media_url ? `http://www.toutiao.com${_news.media_url}` : 'http://www.toutiao.com';
        _news.content = _news.abstract || ``;
        _news.tag = _news.chinese_tag || `推荐`;
        _news.img = _news.image_url || '';
        _news.comment = _news.comments_count || '';
        return _news;
      })
      let info = news.map(_news => {
        let str = `<div class="news"><div class="title"><a target="_blank" href="${_news.uri}"><img src="${_news.img}" alt="${_news.title}" title="${_news.content}"></a>
            <h3><a target="_blank" href="${_news.uri}">${_news.title}</a></h3></div>
          <div><p class="content">${_news.content}</p></div>
          <p class="tag">
            <span class="left"><a target="_blank" href="${_news.userUri}">${_news.userName}</a></span>
            <span class="left">${_news.tag}</span>
            <span class="right">${_news.comment}&nbsp;评论</span>
          </p>
        </div>`
        return str;
      }).join('');
      res.send(info);
    } else {
      console.error(err);
      console.error(response.statusCode);
    }
  })
}

const form = (req, res, next) => {
  res.render('post', {
    title: '发布文章'
  });
}

const submit = (req, res, next) => {
  let userId = req.session.uid;
  let userName = req.session.name;
  let news = req.body;
  news.userId = userId;
  news.userName = userName;
  NewsModel.store(news, (err, doc) => {
    if (err) {
      console.error(err);
      res.error('未知错误。');
      res.redirect('back');
    } else {
      res.redirect('/index.html');
    }
  })
}

module.exports = {
  list,
  form,
  submit,
  append
}
