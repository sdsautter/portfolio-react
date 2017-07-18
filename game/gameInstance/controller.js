const config = require('./config');
const mongoose = require('mongoose');
const GameInstanceDocument = mongoose.model('GameInstance');
const User = mongoose.model('User');
const gameEngine = require('../gameEngine');

exports.createGame = async(req, res, next) => {
  // LEGACY, USED TO MANUALLY CREATE GAMES WITH POST ROUTE. FUNCTIONALITY MOVED TO .joinGame

  // // Run once to create mock user
  // const user = await (new User({
  //   username: 'Julio',
  //   email: 'julio@test.com',
  //   password: 'test123'
  // })).save(); // Mock user
  // console.log(JSON.stringify(user));

  // create a new blank game instance
  req.body.gameReference = await (new GameInstanceDocument()).save();
  next();
};

exports.joinGame = async(req, res) => {
  // Looks for an game in the waiting state and if there aren't any 
  // creates a new game and puts it in the waiting state.
  // Joins the user to the oldest game in the waiting state.  
  // Changes the waiting state to playing state if there are maxUsers in the instance.
  // Returns this object
  //   "gameInstance": {
  //     "gameInstanceId": gameInstance._id,
  //   }
  // }

  let gameReference = '';
  let gamesInWaitingState = [];
  const playerId = req.session.passport.user;
  // Find the games in the waiting state
  gamesInWaitingState = await GameInstanceDocument.find({
    state: 'waiting',
  }).sort('-date');
  // If there are any set the game reference to the oldest one
  if (gamesInWaitingState.length > 0) gameReference = gamesInWaitingState[0]._id;
  // If there aren't any create a new game and set the game reference
  if (gamesInWaitingState.length === 0) {
    console.log('creating new game');
    const newGame = await (new GameInstanceDocument()).save();
    console.log(newGame);
    gameReference = newGame._id;
  }

  // validate the user and save the reference 
  // @TODO - change reference to user session data and don't query mongo
  const playerReference = await User.findById(
    playerId
  );

  // find the game instance and add the first user
  let updatedGameReference = await GameInstanceDocument.findOneAndUpdate({
    _id: gameReference,
  }, {
    $push: {
      players: {
        user: playerReference._id,
        // store player name until populate is working
        username: playerReference.username,
      },
    },
  }, {
    new: true,
  });

  // Is there are enough players in the instance start the game
  if (updatedGameReference.players.length === config.maxUsers) {
    updatedGameReference = await GameInstanceDocument.findOneAndUpdate({
      _id: gameReference,
    }, {
      state: 'playing',
    }, {
      new: true,
    });
    gameEngine.startGame(updatedGameReference._id);
  }
  // return the new game reference
  return res.json({
    gameInstance: {
      gameInstanceId: updatedGameReference._id,
    },
  });
};

exports.listGames = async(req, res) => {
  const activeGames = await GameInstanceDocument.find({
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
  let updatedGameReference = await GameInstanceDocument.findOneAndUpdate({
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
    updatedGameReference = await GameInstanceDocument.findOneAndUpdate({
      _id: req.body.gameReference,
    }, {
      state: 'abandoned',
    });
  }
  return res.redirect('/games');
};