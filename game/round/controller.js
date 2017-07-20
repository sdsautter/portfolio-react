const config = require('./config');
const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');

exports.findRounds = async(gameInstance) => {
  const gameRounds = await Round.find({
    gameInstance,
  }).sort({
    startTime: 'desc',
  });
  return gameRounds;
};

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

exports.submitAnswer = async(req, res) => {
  const gameInstanceId = req.params.gameInstance;
  const answer = req.body.answer;
  const playerId = req.session.passport.user;

  // Find the active round
  const gameReference = await GameInstance.findById(gameInstanceId);

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

      if (playerHasAnswered) return res.json({
        error: 'Answer already submitted',
      });
    }
    // validate the answer is in the correct format.  
    const validatedAnswer = validateAnswer(answer, activeRound.letters);
    if (validatedAnswer) {
      console.log('submitting valid answer ...');
      // @TODO scrub the answer for xss and injections
      const timeLapsed = 60 - Math.floor(-1 * ((activeRound.startTime - Date.now()) / 1000));
      console.log(`timelapsed since round started ${timeLapsed}`);
      const scorePotential = calculateScorePotential(activeRound.number, timeLapsed);
      console.log(`answer score potential: ${scorePotential}`);
      // Put the answer and score potential in the database 
      const activeRoundWithNewAnswer = await Round.findOneAndUpdate({
        gameInstance: gameInstanceId,
        state: 'playing',
      }, {
        $push: {
          answers: {
            player: playerId,
            // store player name until populate is working
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
      return res.json({
        status: 'Success',
      });
    }
    if (!validatedAnswer) return res.json({
      error: 'Invalid Answer',
    });
  }
  return res.json({
    error: `No rounds are currently accepting answers in game ${gameInstanceId}`,
  });
};