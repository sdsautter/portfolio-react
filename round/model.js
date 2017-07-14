const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoundSchema = new Schema({
  gameInstance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameInstance',
  },
  number: Number,
  timeLeft: Number,
  letters: [String],
  answers: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    answer: [String],
    timeSubmitted: Number,
    scorePotential: Number,
    votes: [{
      players: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }],
    points: Number,
  }],
});

const Round = mongoose.model('Round', RoundSchema);
module.exports = Round;
