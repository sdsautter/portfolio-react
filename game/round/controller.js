const mongoose = require('mongoose');
const Answer = require('../answer/controller');
const Vote = require('../vote/controller');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');
const gameConfig = require('../config');

const generateRandomLetters = (num) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let letterArray = [];
  let letterIndex = '';
  for (let i = 0; i < num; i++) {
    letterIndex = Math.floor(Math.random() * alphabet.length);
    letterArray.push(alphabet[letterIndex]);
  }
  return letterArray;
};

const calculateScorePotential = (round, timeLeft) => {
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
};

const validateAnswer = (answer, letterArray) => {
  const answerArray = answer.toLowerCase().split(' ');
  console.log(answerArray);
  if (answerArray.length === letterArray.length) {
    var validatedWords = 0;
    for (let i = 0; i < letterArray.length; i++) {
      if (answerArray[i].startsWith(letterArray[i].toLowerCase())) {
        validatedWords++;
      }
    }
    if (validatedWords === letterArray.length) {
      return true;
    }
  }
  return false;
};

exports.findRounds = async(gameInstance) => {
  const gameRounds = await Round.find({
    gameInstance,
  }).sort({
    startTime: 'desc',
  });
  return gameRounds;
};

exports.setRoundState = async(_id, state) => {
  const roundWithNewState = await Round.findByIdAndUpdate({
    _id,
  }, {
    state,
  }, {
    new: true,
  });

  return roundWithNewState;
};

exports.createRound = async(gameInstance) => {
  // Create the game reference
  // const gameInstance = await GameInstance.findById(gameInstanceId);
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
      return {
        error: `${lastRound} rounds exist, cannot create new round.`,
      };
  }
  const newRound = await new Round({
    gameInstance,
    state: 'playing',
    letters,
    number: lastRound + 1,
  }).save();
  // timeout funtion for the length of the game and change the state to complete if it's not already
  return newRound;
};

exports.submitVote = async(gameInstance, player, answer) => {
  // Find the active game
  // const gameReference = await GameInstance.findById(gameInstance);
  // Find any rounds in the voting state
  let activeRound = await Round.find({
    gameInstance,
    state: 'voting',
  });
  // if there isn't an active round
  if (activeRound.length === 0) {
    // notify the player that there isn't a round accepting answers
    return {
      error: `No rounds are currently accepting answers in game ${gameInstance}`,
    };
  }
  // transform the returned array into an object
  activeRound = activeRound[0];
  // make sure the player hasn't voted already
  const playerHasVoted = await Vote.findVotesByRoundAndPlayer(activeRound._id, player);
  // if the player has voted don't let them vote again
  if (playerHasVoted) return {
    error: 'Vote already submitted',
  };
  const validAnswer = await Answer.findById(answer);
  // if the answer isn't valid don't let them submit a vote
  if (!validAnswer) return {
    error: 'Invalid answer',
  };
  // submit the vote
  const newVote = await Vote.submitVote(activeRound._id, player, validAnswer._id);
  // return success
  return {
    status: 'Success',
  };
};

exports.submitAnswer = async(gameInstance, player, answer) => {
  // Find any rounds in the playing state
  let activeRound = await Round.find({
    gameInstance,
    state: 'playing',
  });
  // if there isn't an active round
  if (activeRound.length === 0) {
    // notify the player that there isn't a round accepting answers
    return {
      error: `No rounds are currently accepting answers in game ${gameInstance}`,
    };
  }
  // transform the returned array into an object
  activeRound = activeRound[0];
  // if the user hasn't already answered
  const playerHasAnswered = await Answer.findAnswerByRoundAndPlayer(activeRound._id, player);
  // If they've already answered don't let them submit another answer
  if (playerHasAnswered) return {
    error: 'Answer already submitted',
  };
  // validate the answer is in the correct format.  
  const validatedAnswer = validateAnswer(answer, activeRound.letters);
  // notify the player that the answer wasn't valid
  if (!validatedAnswer) return {
    error: 'Invalid Answer',
  };

  // @TODO scrub the answer for xss and injections
  const timeLapsed = gameConfig.PLAYTIMER - Math.floor(-1 * ((activeRound.startTime - Date.now()) / 1000));
  const scorePotential = calculateScorePotential(activeRound.number, timeLapsed);
  // Put the answer and score potential in the database 
  const newAnswer = await Answer.createAnswer(activeRound._id, player, answer, scorePotential);
  // @TODO - See if everyone has answered and if they have change the state to voting 

  // update the player that the answer was accepted
  return {
    status: 'Success',
  };
};

exports.calculatePoints = async(game, round) => {
  // console.log(`Looking for game instance: ${game}`);
  // find the game instance
  const gameInstance = await GameInstance.findById(game);
  // console.log(`Found game instance: ${gameInstance}`);
  // console.log(`Looping through ${gameInstance.players.length} players ...`);
  // Loop through the players
  for (let i = 0; i < gameInstance.players.length; i++) {
    // console.log(`player-${i}: ${gameInstance.players[i].user}`);
    const player = gameInstance.players[i].user;
    // find the player's answer for the round
    // console.log('Looking for answers ...')
    let playerAnswer = await Answer.findAnswerByRoundAndPlayer(round, player);
    let score = 0;
    // if the player answered
    if (playerAnswer) {
      // convert the answer from and array into an object
      playerAnswer = playerAnswer[0];
      // console.log(`found answers for player: ${player}`);
      // console.log(`${playerAnswer}`);
      // find any votes for the answer
      // console.log(`Looking for votes for answer: ${playerAnswer._id} ...`);
      const votes = await Vote.findVotesByAnswer(playerAnswer._id);
      // console.log(`votes: ${votes}`);
      // if there are any votes
      if (votes) {
        // console.log(`Found votes: ${votes}`);
        // calculate the score
        score = parseInt(playerAnswer.scorePotential) * votes.length;
        // console.log(`setting score to ${parseInt(playerAnswer.scorePotential) * votes.length} from Score Potential: ${parseInt(playerAnswer.scorePotential)} and Votes: ${votes.length}`);
      }
    }
    // console.log('updating round with new information');
    // Add the player's score to the round
    const updatedRound = await Round.findOneAndUpdate({
      _id: round,
    }, {
      $push: {
        scores: {
          player,
          score,
        },
      },
    }, {
      new: true,
    });
    // console.log(`round update: ${updatedRound}`);
  }
  // 
  return true;
};

exports.addPointToGameInstance = async(round) => {
  // console.log('Adding points to game instance');
  // console.log(`Looking for round id: ${round}`);
  const roundWithScores = await Round.findById(round);
  // console.log(`found round: ${roundWithScores}`);
  // console.log(`looking for game instance: ${roundWithScores.gameInstance}`);
  const game = await GameInstance.findById(roundWithScores.gameInstance);
  // console.log(`found round: ${game}`);
  for (let i = 0; i < roundWithScores.scores.length; i++) {
    let currentPoints = 0;
    // find the existing score in the game
    for (let j = 0; j < game.players.length; j++) {
      // console.log(`checking to see if ${game.players[j].user} is the same ${roundWithScores.scores[i].player}`);
      if (game.players[j].user.equals(roundWithScores.scores[i].player)) {
        // console.log(`they match, current points is ${game.players[j].points}`);
        currentPoints = parseInt(game.players[j].points);
      }
    }
    // console.log(`The new score will be ${currentPoints + parseInt(roundWithScores.scores[i].score)}`);
    const newScore = currentPoints + parseInt(roundWithScores.scores[i].score);
    const newGame = await GameInstance.findOneAndUpdate({
      _id: roundWithScores.gameInstance,
      'players.user': roundWithScores.scores[i].player,
    }, {
      $set: {
        'players.$.points': newScore,
      },
    }, {
      new: true,
    });
    // console.log(`updated game instance: ${newGame}`);
  }
  return true;
};
// let currentPoints = game.players.map((player) => {
//   console.log(`checking to see if ${player.user} is the same as ${roundWithScores.scores[i].player}`);
//   if (player.user.equals(roundWithScores.scores[i].player)) {
//     console.log(`it is, getting player points ${parseInt(player.points)}`);
//     return parseInt(player.points);
//   }
// })[0];
// if (currentPoints === undefined) currentPoints = 0;
// console.log(`currentPoints for ${roundWithScores.scores[i].player} is ${currentPoints}`);
// const newScore = parseInt(currentPoints) + parseInt(roundWithScores.scores[i].score);
// console.log(`newScore: ${newScore}`);
// const newGame = await GameInstance.findOneAndUpdate({
//   _id: roundWithScores.gameInstance,
//   'players.user': roundWithScores.scores[i].player,
// }, {
//   $set: {
//     'players.$.points': newScore,
//   },
// }, {
//   new: true,
// });
// console.log(`updated game instance: ${newGame}`);