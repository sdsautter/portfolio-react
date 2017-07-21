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
});

const Round = mongoose.model('Round', RoundSchema);
module.exports = Round;
