const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  players: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    points: {
      type: Number,
      default: 0,
    },
  }],
  state: {
    type: String,
    default: 'waiting',
  },
});

const GameInstance = mongoose.model('GameInstance', GameInstanceSchema);
module.exports = GameInstance;