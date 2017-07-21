const config = require('./config');
const mongoose = require('mongoose');
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
      if (answerArray[i].startsWith(letterArray[i])) {
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

exports.submitVote = async(gameInstanceId, playerId, voteId) => {
  // Find the active game
  // const gameReference = await GameInstance.findById(gameInstanceId);
  // Find any rounds in the voting state
  let activeRound = await Round.find({
    gameInstance: gameInstanceId,
    state: 'voting',
  });
  console.log(`Active Round: ${activeRound}`);
  // if there is an active round
  if (activeRound.length !== 0) {
    console.log(`active round length isn't 0`);
    // transform the returned array into an object
    activeRound = activeRound[0];
    console.log(`active round is now ${activeRound}`);
    // make sure the player hasn't voted already
    if (activeRound.answers.length !== 0) {
      console.log(`active round answers length isn't 0`);
      let playerHasVoted = false;
      playerHasVoted = activeRound.answers.map((a) => {
        if (a.votes.includes(playerId)) return true;
        // for (let i = 0; i < a.votes.length; i++) {
        //   console.log(`looking for ${parseInt(playerId)} to match ${parseInt(a.votes[i].player)}`);
        //   if (parseInt(a.votes[i].player) === parseInt(playerId)) return true;
        // }
      });
      console.log(`has the players voted? ${playerHasVoted}`);
      // if the player has voted don't let them vote again
      if (playerHasVoted) return {
        error: 'Vote already submitted',
      };
      // find the vote from the voteId
      const voteIsValid = activeRound.answer.map((a, i) => {
        if (parseInt(a._id) === parseInt(voteId)) return {
          currentPoints: a.points,
          scorePotential: a.scorePotential,
          index: i,
        };
      });
      // if the vote is a valid one
      if (voteIsValid) {
        // add the player's vote and increase the score for the voted answer
        const updatedPoints = voteIsValid.currentPoints + voteIsValid.scorePotential;
        const answerLocation = `answers.${voteIsValid.index}`;
        const voteLocation = `answers.${voteIsValid.index}.votes`;
        const activeRoundWithVote = await Round.findOneAndUpdate(gameInstanceId, {
          $push: {
            voteLocation: {
              player: playerId,
            },
          },
          answerLocation: {
            points: updatedPoints,
          },
        }, {
          new: true,
        });
        // return success
        return {
          status: 'Success',
        };
      }
      return {
        error: 'Answer not found',
      };
    }
  }
  return {
    error: `No rounds are currently accepting votes in game ${gameInstanceId}`,
  };
};

exports.submitAnswer = async(gameInstanceId, playerId, answer) => {
  // Find the active game
  const gameReference = await GameInstance.findById(gameInstanceId);
  // Find any rounds in the playing state
  let activeRound = await Round.find({
    gameInstance: gameInstanceId,
    state: 'playing',
  });
  // if there is an active round
  if (activeRound.length !== 0) {
    // transform the returned array into an object
    activeRound = activeRound[0];
    // if the user isn't already in the array of answered users
    if (activeRound.answers.length !== 0) {
      const playerHasAnswered = activeRound.answers.map((a) => {
        if (parseInt(a.player) === parseInt(playerId)) return true;
      });
      // If they've already answered don't let them submit another answer
      if (playerHasAnswered) return {
        error: 'Answer already submitted',
      };
    }
    // validate the answer is in the correct format.  
    const validatedAnswer = validateAnswer(answer, activeRound.letters);
    if (validatedAnswer) {
      // @TODO scrub the answer for xss and injections
      const timeLapsed = 60 - Math.floor(-1 * ((activeRound.startTime - Date.now()) / 1000));
      const scorePotential = calculateScorePotential(activeRound.number, timeLapsed);
      // Put the answer and score potential in the database 
      const activeRoundWithNewAnswer = await Round.findOneAndUpdate({
        gameInstance: gameInstanceId,
        state: 'playing',
      }, {
        $push: {
          answers: {
            player: playerId,
            answer,
            scorePotential,
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
        });
      }
      // update the player that the answer was accepted
      return {
        status: 'Success',
      };
    }
    // notify the player that the answer wasn't valid
    if (!validatedAnswer) return {
      error: 'Invalid Answer',
    };
  }
  // notify the player that there isn't a round accepting answers
  return {
    error: `No rounds are currently accepting answers in game ${gameInstanceId}`,
  };
};