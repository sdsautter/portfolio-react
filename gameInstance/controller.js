const config = require('./config');
const mongoose = require('mongoose');
const GameInstance = mongoose.model('GameInstance');
const User = mongoose.model('User');

// Run once to create mock user
// const user = await (new User({ username: 'Julio', email: 'julio@test.com', password: 'test123' })).save(); // Mock user
// hard coded for dev, use req.user._id once auth is working
const _id = '59691ba53295db29d84f6d49';

exports.createGame = async(req, res, next) => {
  // create a new blank game instance
  req.body.gameReference = await (new GameInstance()).save();
  next();
};

exports.joinGame = async(req, res) => {
  // validate the user and save the reference
  const playerReference = await User.find({
    _id,
  });
  // find the newly created game instance and add the first user
  let updatedGameReference = await GameInstance.findOneAndUpdate({
    _id: req.body.gameReference,
  }, {
    $push: {
      players: playerReference,
    },
  }, {
    new: true,
  });
  // Is there are enough players in the instance start the game
  if (updatedGameReference.players.length === config.maxUsers) {
    updatedGameReference = await GameInstance.findOneAndUpdate({
      _id: req.body.gameReference,
    }, {
      state: 'playing',
    }, {
      new: true,
    });
    // redirect the user to the game instance page
    // return res.redirect(`/game/${req.body.gameReference}`);
  }
  // return the new game reference
  return res.json(updatedGameReference);
};

exports.listGames = async(req, res) => {
  const activeGames = await GameInstance.find({
    state: 'waiting',
  });
  return res.json(activeGames);
};

exports.leaveGame = async(req, res, next) => {
  // validate the user and save the reference
  const playerReference = await User.find({
    _id,
  });
  // find the newly created game instance and add the first user
  let updatedGameReference = await GameInstance.findOneAndUpdate({
    _id: req.body.gameReference,
  }, {
    $pull: {
      players: playerReference,
    },
  }, {
    new: true,
  });
  // If there are no more players in the game mark the game abandoned
  if (updatedGameReference.players.length === 0) {
    updatedGameReference = await GameInstance.findOneAndUpdate({
      _id: req.body.gameReference,
    }, {
      state: 'abandoned',
    });
  }
  return res.redirect('/games');
};
