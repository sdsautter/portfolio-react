import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  players: [{
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    points: Number,
  }]
});

const GameInstance = mongoose.model("GameInstance", GameInstanceSchema);
module.exports = GameInstance;
