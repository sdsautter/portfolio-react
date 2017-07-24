const mongoose = require('mongoose');
const Status = mongoose.model('Status');
const GameInstance = mongoose.model('GameInstance');
const Round = require('../round/controller');
const Answer = require('../answer/controller');
const gameConfig = require('../config');


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
      timeLeft = gameConfig.PLAYTIMER - Math.floor(-1 * ((round.startTime - Date.now()) / 1000));
      // If a player has submitted an answer mark it down.
      for (let i = 0; i < players.length; i++) {
        const answer = await Answer.findAnswerByRoundAndPlayer(round._id, players[i].user);
        if (answer) submittedAnswers.push({
          username: players[i].username,
        });
      }
      // Create the return object
      activeRound = {
        number: round.number,
        letters: round.letters,
        timeLeft,
        state: round.state,
        submittedAnswers,
      };
    }

    if (round.state === 'voting') {
      timeLeft = gameConfig.VOTETIMER - Math.floor(-1 * ((round.startTime - Date.now()) / 1000));
      const answers = await Answer.findAnswerByRound(round._id);
      if (Array.isArray(answers)) {
        if (answers.length !== 0) {
          userAnswers = answers.map((answer) => {
            return {
              answer: answer.answer,
              answerId: answer._id,
            };
          });
        }
      }

      activeRound = {
        number: round.number,
        letters: round.letters,
        timeLeft,
        state: round.state,
        userAnswers,
      };
    }

    if (round.state === 'results') {
      timeLeft = gameConfig.RESULTSTIMER - Math.floor(-1 * ((round.startTime - Date.now()) / 1000));

      // search players for the Id and get the username and store the username and points
      for (let i = 0; i < round.scores.length; i++) {
        for (let j = 0; j < players.length; j++) {
          if (parseInt(players[j].user) === parseInt(round.scores[i].player)) {
            userScore.push({
              username: players[j].username,
              score: round.scores[i].score,
            });
          }
        }
      }

      activeRound = {
        number: round.number,
        letters: round.letters,
        timeLeft,
        state: round.state,
        userScore,
      };
    }
  }

  return {
    gameInstance: {
      Id: gameId,
      state: gameState,
      players: sanitizedPlayers,
    },
    activeRound,
  };
};
