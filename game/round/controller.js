const config = require('./config');
const mongoose = require('mongoose');
const Answer = require('../answer/controller');
const Vote = require('../vote/controller');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');

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
  const answerArray = answer.split(' ');
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
  const timeLapsed = 60 - Math.floor(-1 * ((activeRound.startTime - Date.now()) / 1000));
  const scorePotential = calculateScorePotential(activeRound.number, timeLapsed);
  // Put the answer and score potential in the database 
  const newAnswer = await Answer.createAnswer(activeRound._id, player, answer, scorePotential);
  // @TODO - See if everyone has answered and if they have change the state to voting 

  // update the player that the answer was accepted
  return {
    status: 'Success',
  };
};

exports.calculatePoints = async(_id) => {
  // find each answer for the round
  const answers = await Answer.findAnswerByRound(_id);

  if (!answers) return false;

  // find how many votes each answer got
  let votes = [];
  for (let i = 0; i < answers.length; i++) {
    votes = await Vote.findVotesByAnswer(answers[i]._id);
    // multiply the scorePotential by the number of votes received and add it to the user's points total for the round      
    const totalPointsForRound = answers[i].scorePotential * votes.length;
    // Add the player's score to the round

    const updatedRound = await Round.findOneAndUpdate({
      _id,
    }, {
      $push: {
        scores: {
          player: answers[i].player,
          score: totalPointsForRound,
        },
      },
    }, {
      new: true,
    });
  }
  // 
  return true;
};

exports.addPointToGameInstance = async(round) => {
  const roundWithScores = await Round.findById(round);
  gameInstance = round.gameInstance;
}