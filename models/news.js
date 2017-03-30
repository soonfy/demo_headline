const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const NewsSchema = new Schema({
  title: {
    type: String,
    index: true
  },
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  content: {
    type: String
  },
  uri: {
    type: String
  },
  published: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

NewsSchema.static('store', function (doc, cb) {
  this.create(doc, (err, _user) => {
    if (err) {
      console.error(err);
      return cb(`create err.`)
    }
    cb(null, _user);
  })
})

NewsSchema.static('read', function (doc, cb) {
  this.find({}, {}, {
    sort: {
      published: -1
    },
    skip: doc.skip,
    limit: doc.limit
  }, (err, _news) => {
    if (err) {
      console.error(err);
      // 查询出错
      return cb(new Error(`find error.`));
    }
    cb(null, _news);
  })
})


// Model
const NewsModel = mongoose.model('NewsModel', NewsSchema, 'news');

module.exports = NewsModel;
