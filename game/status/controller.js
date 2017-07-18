const mongoose = require('mongoose');
const Status = mongoose.model('Status');

// GameStatus class keeps track of the game status and returns a sanitized version for front end consumption 
class GameStatus {
  constructor(gameInstance) {
    this.gameId = gameInstance._id;
    this.gameState = gameInstance.state;
    this.players = gameInstance.players;
  }

  sanitizedPlayers() {
    return this.players.map(obj => {
      const player = {
        username: obj.username,
        points: obj.points,
      };
      return player;
    });
  }

  get report() {
    const status = {
      gameInstance: {
        Id: this.gameId,
        state: this.gameState,
        players: this.sanitizedPlayers(),
      },
    };
    return status;
  }
}

const setGameStatus = async(gameInstanceId) => {
  // // Get the game instance Id from the URI
  // const gameInstanceId = req.params.gameInstance;
  // Find the game instance document
  // const gameInstanceReference = await GameInstanceDocument.findById(gameInstanceId);
  // Construct the status
  const gameStatus = new GameStatus(gameInstanceReference);
  // return the game status report
  res.json(gameStatus.report);
};

const getRoundStatus = async(roundId) => {
  const activeRound = await Round.findById(roundId);
};