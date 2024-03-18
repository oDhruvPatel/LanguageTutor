const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    level: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    correctAnswer: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    language: {
      type: String,
      required: true
    }
});

const German = mongoose.model('German', userSchema);

module.exports = German;
