const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiarySchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Diary', DiarySchema);
