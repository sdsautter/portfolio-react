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
  answers: [{
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
    votes: [{
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }],
    points: Number,
  }],
});

const Round = mongoose.model('Round', RoundSchema);
module.exports = Round;