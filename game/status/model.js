const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  gameInstance: {
    gameInstanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GameInstance',
    },
    state: String,
    players: [{
      username: String,
      points: {
        type: Number,
        default: 0,
      },
    }],
  },
  ActiveRound: {
    number: Number,
    timeLeft: Date,
    state: String,
    userSubmitted: [{
      username: String,
      submitted: Boolean,
    }],
    userAnswers: [{
      answer: String,
      answerId: mongoose.Schema.Types.ObjectId,
    }],
    userScores: [{
      username: String,
      userScoreForRound: Number,
    }],
  },
});

const Status = mongoose.model('Status', StatusSchema);
module.exports = Status;