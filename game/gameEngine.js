const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');
const Status = mongoose.model('Status');
const gameInstanceController = require('./gameInstance/controller');
const roundController = require('./round/controller');
const statusController = require('./status/controller');

exports.getStatus = async(req, res, next) => {
  // Get the game instance Id from the URI
  const gameInstanceId = req.params.gameInstance;
  // Find the game instance document
  // const gameInstanceReference = await GameInstance.findById(gameInstanceId);
  // console.log(gameInstanceReference);
  // // Construct the status
  // const gameStatus = new statusController.GameStatus(gameInstanceReference);
  // // return the game status report
  // const status = gameStatus.report;

  const status = await statusController.generateStatus(gameInstanceId);
  res.json(status);
};

const createTimer = (time) => {
  time = time * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  // var timeLapsed = 0;

  // function checkTimeout() {
  //   console.log(timeLapsed);
  //   if (timeLapsed === time) return callback(timeLapsed);
  //   setTimeout(() => {
  //     timeLapsed++;
  //     checkTimeout();
  //   }, 1000);
  // }

  // return checkTimeout();
};

exports.startGame = async(gameInstanceId) => {
  for (let i = 1; i < 7; i++) {
    // create a new round for the game
    let newRound = await roundController.createRound(gameInstanceId);

    if (newRound.error) return newRound.error;
    // Start the round timer for 60 seconds
    // let allPlayersAnswered = false;
    // var timeLapsed = 0;
    // while (timeLapsed > 60) {
    //   setInterval(function() {
    //     console.log(timeLapsed);
    //     timeLapsed++;
    //   }, 1000);
    //   // allPlayersAnswered = await getRoundStatus(newRound._id);
    // }
    const playTimer = await createTimer(60);

    // Set the round state to voting
    const roundInVotingState = await roundController.setRoundState(newRound._id, 'voting');
    // After 30 seconds move to the results state
    const voteTimer = await createTimer(30);
    // Set the round state to results
    const roundInResultsState = await roundController.setRoundState(newRound._id, 'results');
    const resultsTimer = await createTimer(15);
    // After 15 seconds move to the complete state

    // Set the round state to complete
    const roundInCompleteState = await roundController.setRoundState(newRound._id, 'complete');
  }

  const competeGameInstanceReference = await GameInstance.findOneAndUpdate({
    _id: gameInstanceId,
  }, {
    state: 'complete',
  }, {
    new: true,
  });

  return competeGameInstanceReference;
};