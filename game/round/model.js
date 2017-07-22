const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoundSchema = new Schema({
  gameInstance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameInstance',
  },
  number: Number,
  state: String,
  startTime: {
    type: Date,
    default: Date.now,
  },
  letters: [String],
  scores: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    score: {
      type: Number,
      default: 0,
    },
  }],
});

const Round = mongoose.model('Round', RoundSchema);
module.exports = Round;