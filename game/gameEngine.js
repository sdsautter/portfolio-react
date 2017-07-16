const mongoose = require('mongoose');
const GameInstanceDocument = mongoose.model('GameInstance');
const UserDocument = mongoose.model('User');
const gameInstance = require('./gameInstance/controller');
const round = require('./round/controller');


class GameStatus {
  constructor(gameInstanceDocument) {
    this.gameId = gameInstanceDocument._id;
    this.gameState = gameInstanceDocument.state;
    this.players = gameInstanceDocument.players;
  }

  report() {
    const status = {
      gameInstance: {
        Id: this.gameId,
        state: this.gameState,
        players: {
          users: this.players,
        },
      },
    };
    return status;
  }
}


exports.getStatus = async(req, res, next) => {
  const gameInstanceId = req.params.gameInstance;
  const gameInstanceReference = await GameInstanceDocument.findById(gameInstanceId).populate({
    path: 'players',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  console.log(JSON.stringify(gameInstanceReference));
  // const gameStatus = new GameStatus();
  res.json(gameInstanceReference);
};

// get the gameInstance document
// check it's status