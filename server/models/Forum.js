const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  replies: [{ content: String, author: String }],
});

module.exports = mongoose.model('Forum', ForumSchema);
