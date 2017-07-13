import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  players: [{
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    pointsTotal: Number,
  }],
  round1 : {
      startTime: Number,
      letters: [String],
      answers: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [String],
        timeSubmitted: Number,
        scorePotential: Number,
        votes: [{
            players: {
                type: mongoose.Schema.type.ObjectId,
                ref: "User"
            }
        }],
        points: Number
      }]
  },
  round2 : {
      startTime: Number,
      letters: [String],
      answers: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [String],
        timeSubmitted: Number,
        scorePotential: Number,
        votes: [{
            players: {
                type: mongoose.Schema.type.ObjectId,
                ref: "User"
            }
        }],
        points: Number
      }]
  },
  round3 : {
      startTime: Number,
      letters: [String],
      answers: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [String],
        timeSubmitted: Number,
        scorePotential: Number,
        votes: [{
            players: {
                type: mongoose.Schema.type.ObjectId,
                ref: "User"
            }
        }],
        points: Number
      }]
  },
  round4 : {
      startTime: Number,
      letters: [String],
      answers: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [String],
        timeSubmitted: Number,
        scorePotential: Number,
        votes: [{
            players: {
                type: mongoose.Schema.type.ObjectId,
                ref: "User"
            }
        }],
        points: Number
      }]
  },
  round5 : {
      startTime: Number,
      letters: [String],
      answers: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [String],
        timeSubmitted: Number,
        scorePotential: Number,
        votes: [{
            players: {
                type: mongoose.Schema.type.ObjectId,
                ref: "User"
            }
        }],
        points: Number
      }]
  },
  finalRound : {
      startTime: Number,
      letters: [String],
      answers: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [String],
        timeSubmitted: Number,
        scorePotential: Number,
        votes: [{
            players: {
                type: mongoose.Schema.type.ObjectId,
                ref: "User"
            }
        }],
        points: Number
      }]
  }
});

const GameInstance = mongoose.model("GameInstance", GameInstanceSchema);
module.exports = GameInstance;
