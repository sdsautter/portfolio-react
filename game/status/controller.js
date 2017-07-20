const mongoose = require('mongoose');
const Status = mongoose.model('Status');
const GameInstance = mongoose.model('GameInstance');
const Round = require('../round/controller');

// const getRoundStatus = async(gameInstanceId) => {
//   return new Promise((resolve) => {
//     const gameRounds = await Round.findById({
//       gameInstance: gameInstanceId
//     }).sort('-date');
//     return resolve(gameRounds);
//   });
// };
// GameStatus class keeps track of the game status and returns a sanitized version for front end consumption 
exports.GameStatus = class {
  constructor(gameInstance) {
    this.gameId = gameInstance._id;
    this.gameState = gameInstance.state;
    this.players = gameInstance.players;
  }

  // getRoundStatus(gameInstanceId) {
  //   return new Promise((resolve) => {
  //     const gameRounds = await Round.find({
  //       gameInstance: gameInstanceId
  //     }).sort('-date');
  //     return resolve(gameRounds);
  //   });
  // }

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
    // let activeRound = await Round.findRounds(this.gameId);

    // if (activeRound.length !== 0) {
    //   console.log(`activeRound: ${activeRound[0]}`);
    //   activeRound = activeRound[0];
    // }

    const status = {
      gameInstance: {
        Id: this.gameId,
        state: this.gameState,
        players: this.sanitizedPlayers(),
      },
      // activeRound,
    };
    return status;
  }
};


exports.generateStatus = async(gameInstanceId) => {
  let activeRound = {};
  let submittedAnswers = [];
  let userAnswers = [];
  let userScore = [];
  let timeLeft;
  // find the game instance
  const gameInstance = await GameInstance.findById(gameInstanceId);

  const gameId = gameInstance._id;
  const gameState = gameInstance.state;
  const players = gameInstance.players;

  // remove all information from the players data except the username and points
  const sanitizedPlayers = players.map(obj => {
    const player = {
      username: obj.username,
      points: obj.points,
    };
    return player;
  });

  // find the game rounds
  const gameRounds = await Round.findRounds(gameInstanceId);

  // If there's an active round get the information
  if (gameRounds.length !== 0) {
    const round = gameRounds[0];

    if (round.state === 'playing') {
      timeLeft = 60 - Math.floor(-1 * ((round.startTime - Date.now()) / 1000));
      // If a player has submitted an answer mark it down.
      if (round.answers.length !== 0) {
        for (let i = 0; i < round.answers.length; i++) {
          for (let j = 0; j < players.length; j++) {
            if (parseInt(round.answers[i].player) === parseInt(players[j].user)) {
              submittedAnswers.push({
                username: players[j].username,
                submitted: true,
              });
            }
          }
        }
      }
      activeRound = {
        number: round.number,
        timeLeft,
        state: round.state,
        submittedAnswers,
      };
    }

    if (round.state === 'voting') {
      timeLeft = 90 - Math.floor(-1 * ((round.startTime - Date.now()) / 1000));
      if (round.answers.length !== 0) {
        for (let i = 0; i < round.answers.length; i++) {
          userAnswers.push({
            answer: round.answers[i].answer,
            answerId: round.answers[i]._id,
          });
        }
      }
      activeRound = {
        number: round.number,
        timeLeft,
        state: round.state,
        userAnswers,
      };
    }

    if (round.state === 'results') {
      timeLeft = 105 - Math.floor(-1 * ((round.startTime - Date.now()) / 1000));

      activeRound = {
        number: round.number,
        timeLeft,
        state: round.state,
        userScore,
      };
    }
  }

  const status = {
    gameInstance: {
      Id: gameId,
      state: gameState,
      players: sanitizedPlayers,
    },
    activeRound,
  };

  return status;
};
