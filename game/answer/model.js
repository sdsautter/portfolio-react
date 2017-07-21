const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  round: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Round',
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answer: String,
  timeSubmitted: {
    type: Date,
    default: Date.now,
  },
  scorePotential: Number,
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
