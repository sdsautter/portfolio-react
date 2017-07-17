const config = require('./config');
const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');

// hard coded for dev, use req.user._id once auth is working
const mockPlayerId = '596b63a99f1bac2c5c680d66';

function generateRandomLetters(num) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let letterArray = [];
  let letterIndex = '';
  for (let i = 0; i < num; i++) {
    letterIndex = Math.floor(Math.random() * alphabet.length);
    letterArray.push(alphabet[letterIndex]);
  }
  return letterArray;
}

function calculateScorePotential(round, timeLeft) {
  if (round < 4) {
    // For the first 3 rounds the max score the can get is 300, and the minimum is 100
    // They lose potential points every second they don't answer
    return Math.floor((timeLeft * (10 / 3)) + 100);
  } else if (round >= 4 && round < 6) {
    // In rounds 4, 5, and 6 the score potential doubles
    return Math.floor((2 * (timeLeft * (10 / 3))) + 100);
  } else if (round === 6) {
    // In the final round the score potential is always the same no matter when it was answered
    return 750;
  }
}


exports.createNewRound = async(req, res) => {
  let gameInstanceId = req.params.gameInstance;
  // Create the game reference
  const gameInstance = await GameInstance.findById(gameInstanceId);
  // Find all rounds for a game instance id
  const existingRounds = await Round.find({
    gameInstance,
  });
  const lastRound = existingRounds.length;
  let letters = '';
  switch (lastRound) {
    case 0:
      // In the first round we want to give them 3 random letters 
      letters = generateRandomLetters(3);
      break;
    case 1:
      // In the second round we want to give them 4 random letters 
      letters = generateRandomLetters(4);
      break;
    case 2:
      // In the third round we want to give them 5 random letters 
      letters = generateRandomLetters(5);
      break;
    case 3:
      // In the forth and fifth round we want to give them 3-5 random letters 
      letters = generateRandomLetters(Math.floor((Math.random() * 5) + 3));
      break;
    case 4:
      letters = generateRandomLetters(Math.floor((Math.random() * 5) + 3));
      break;
    case 5:
      // In the sixth round we want to give them 7 random letters 
      letters = generateRandomLetters(7);
      break;
    default:
      return res.json({
        status: `${lastRound} rounds exist, cannot create new round.`,
      });
  }
  const newRound = await new Round({
    gameInstance: gameInstance._id,
    state: 'playing',
    letters,
    number: lastRound + 1,
  }).save();
  // timeout funtion for the length of the game and change the state to complete if it's not already
  return res.json(newRound);
};

exports.submitAnswer = async(req, res) => {
  const gameInstanceId = req.params.gameInstance;
  const answer = req.body.answer;
  // @TODO - validate that the user from the session is in the game

  // Find the active round
  const gameReference = await GameInstance.findById(gameInstanceId);
  console.log(`gameReference: ${gameReference}`);

  const activeRound = await Round.find({
    gameInstance: gameInstanceId,
    state: 'playing',
  });
  console.log(`activeRound: ${activeRound}`);

  // if there is an active round
  if (activeRound.length !== 0) {
    // if the user isn't already in the array of answered users
    if (activeRound.answers) {
      const playerHasAnswered = activeRound.answers.map((a) => {
        if (a.player == mockPlayerId) return true;
        return false;
      });
      console.log(`playerHasAnswered: ${playerHasAnswered}`);

      if (playerHasAnswered) return res.json({
        status: 'Answer already submitted',
      });
    }

    console.log(`activeRound.startTime: ${activeRound.startTime}`);
    const timeLapsed = (Date.now() - activeRound.startTime) / 1000;
    console.log(`timeLapsed: ${timeLapsed}`);

    const answerScorePotential = calculateScorePotential(activeRound.number, timeLapsed);
    console.log(`answerScorePotential: ${answerScorePotential}`);

    // @TODO - validate the answer is in the correct format.  
    // @TODO scrub the answer for xss and injections

    // Put the answer and score potential in the database 
    const activeRoundWithNewAnswer = await Round.findOneAndUpdate({
      gameInstance: gameInstanceId,
      state: 'playing',
    }, {
      $push: {
        answers: {
          player: mockPlayerId,
          // store player name until populate is working
          answer,
          scorePotential: answerScorePotential,
        },
      },
    }, {
      new: true,
    });

    // see if everyone has answered and if they have change the state to voting 
    if (activeRoundWithNewAnswer.answers.length === gameReference.players.length) {
      const activeRoundWithNewState = await Round.findOneAndUpdate({
        gameInstance: gameInstanceId,
        number: activeRoundWithNewAnswer.number,
        state: 'playing',
      }, {
        state: 'voting',
      }, {
        new: true,
      });
      return res.json(activeRoundWithNewState);
    }
    return res.json(activeRoundWithNewAnswer);
  }
  return res.json({
    status: `No active rounds in game ${gameInstanceId}`,
  });
};
