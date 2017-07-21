const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  round: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Round',
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  },
});

const Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;
