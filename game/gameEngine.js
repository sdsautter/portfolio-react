const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');
const Status = mongoose.model('Status');
const gameInstanceController = require('./gameInstance/controller');
const RoundController = require('./round/controller');

exports.getStatus = async(req, res, next) => {
  // Get the game instance Id from the URI
  const gameInstanceId = req.params.gameInstance;
  // Find the game instance document
  const gameInstanceReference = await GameInstance.findById(gameInstanceId);
  // Construct the status
  const gameStatus = new GameStatus(gameInstanceReference);
  // return the game status report
  res.json(gameStatus.report);
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
    console.log('Creating new round ...');
    // create a new round for the game
    let newRound = await RoundController.createRound(gameInstanceId);

    if (newRound.error) return newRound.error;
    console.log('Starting newRound play timer ...');
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
    const playTimer = await createTimer(5);

    // Set the round state to voting
    console.log('Play timer complete.');
    console.log('Setting round to voting state ...');
    const roundInVotingState = await RoundController.setRoundState(newRound._id, 'voting');
    // After 30 seconds move to the results state
    const voteTimer = await createTimer(5);
    // Set the round state to results
    console.log('Voting timer complete.');
    console.log('Setting round to results state ...');
    const roundInResultsState = await RoundController.setRoundState(newRound._id, 'results');
    const resultsTimer = await createTimer(5);
    // After 15 seconds move to the complete state

    // Set the round state to complete
    console.log('Results timer complete.');
    console.log('Setting round to complete state ...');
    const roundInCompleteState = await RoundController.setRoundState(newRound._id, 'complete');
  }
  return true;
};