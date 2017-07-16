const config = require('./config');
const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');

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
    return timeLeft(3(1 / 3)) + 100;
  } else if (round >= 4 && round < 6) {
    // In rounds 4, 5, and 6 the score potential doubles
    return 2 * (timeLeft(3(1 / 3)) + 100);
  } else if (round === 6) {
    // In the final round the score potential is always the same no matter when it was answered
    return 750;
  }
}

const createNewRound = async(gameInstanceId) => {
  // Create the game reference
  const gameInstance = await GameInstance.findById(gameInstanceId);
  // Find all rounds for a game instance id
  const existingRounds = await Round.find({
    gameInstance,
  });
  const lastRound = existingRounds.length;
  switch (lastRound) {
    case 0:
      // In the first round we want to give them 3 random letters 
      const letters = generateRandomLetters(3);
      break;
    case 1:
      // In the second round we want to give them 4 random letters 
      const letters = generateRandomLetters(4);
      break;
    case 2:
      // In the third round we want to give them 5 random letters 
      const letters = generateRandomLetters(5);
      break;
    case 3:
      // In the forth and fifth round we want to give them 3-5 random letters 
      const letters = generateRandomLetters(Math.floor((Math.random() * 5) + 3));
      break;
    case 4:
      const letters = generateRandomLetters(Math.floor((Math.random() * 5) + 3));
      break;
    case 5:
      // In the sixth round we want to give them 7 random letters 
      const letters = generateRandomLetters(7);
      break;
    default:
      return `${lastRound} rounds exist, can not create new round`;
  }
  const newRound = await Round.create({
    gameInstance,
    letters,
    number: lastRound + 1,
  }).save();
  // timeout funtion for the length of the game and change the state to complete if it's not already
  return newRound;
};

exports.submitAnswer = async(req, res) => {
  // validate that the user from the session is in the game
  // find the active round 
  // validate the answer is in the correct format.  TODO scrub the answer for xss and injections
  // see if everyone has answers and if they have change the state to complete 
};