const Forum = require('../models/Forum');

exports.getForumPage = async (req, res) => {
  res.render('ForumDiscussion/dashboard');
};

exports.postForum = async (req, res) => {
  const author = req.user.username;
  const { title, content } = req.body;
  const forum = new Forum({ title, content, author });
  await forum.save();
  res.status(201).send(forum);
};

exports.getForum = async (req, res) => {
  // mendapatkan semua data forum discussion
  const forum = await Forum.find();
  res.send(forum);
};

exports.replyForum = async (req, res) => {
  const author = req.user.username;
  const { content } = req.body;
  const forum = await Forum.findById(req.params.id);
  forum.replies.push({ content, author });
  await forum.save();
  res.send(forum);
};
