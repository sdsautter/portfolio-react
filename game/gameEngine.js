const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');
const Round = mongoose.model('Round');
const Status = mongoose.model('Status');
const gameInstanceController = require('./gameInstance/controller');
const roundController = require('./round/controller');
const statusController = require('./status/controller');
const gameConfig = require('./config');

exports.submitAnswerOrVote = async(req, res) => {
  const gameInstanceId = req.params.gameInstance;
  const playerId = req.session.passport.user;
  if (req.body.answer != null) {
    const answer = req.body.answer;
    const answerStatus = await roundController.submitAnswer(gameInstanceId, playerId, answer);
    return res.json(answerStatus);
  }
  if (req.body.vote != null) {
    const voteId = req.body.vote;
    const voteStatus = await roundController.submitVote(gameInstanceId, playerId, voteId);
    return res.json(voteStatus);
  }
  return res.json({
    error: 'Invalid request',
  });
};

exports.getStatus = async(req, res, next) => {
  // Get the game instance Id from the URI
  const gameInstanceId = req.params.gameInstance;

  const status = await statusController.generateStatus(gameInstanceId);
  res.json(status);
};

const createTimer = (time) => {
  time = time * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

exports.startGame = async(gameInstanceId) => {
  for (let i = 1; i < 7; i++) {
    // create a new round for the game
    let newRound = await roundController.createRound(gameInstanceId);
    
    if (newRound.error) return newRound.error;
    // Start the round timer for 60 seconds
    const playTimer = await createTimer(gameConfig.PLAYTIMER);
    // Set the round state to voting
    const roundInVotingState = await roundController.setRoundState(newRound._id, 'voting');
    // After 30 seconds move to the results state
    const voteTimer = await createTimer(gameConfig.VOTETIMER);
    // calculate the results for the round
    await roundController.calculatePoints(newRound._id);
    // Set the round state to results
    const roundInResultsState = await roundController.setRoundState(newRound._id, 'results');
    const resultsTimer = await createTimer(gameConfig.RESULTSTIMER);
    // After 15 seconds move to the complete state
    // add the points for the round to the game instance
    // await roundController.addPointToGameInstance(newRound._id);
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