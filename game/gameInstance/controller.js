const config = require('./config');
const mongoose = require('mongoose');
const GameInstanceDocument = mongoose.model('GameInstance');
const User = mongoose.model('User');
const gameEngine = require('../gameEngine');

const createTimer = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
};

const waitForPlayersAndStartGame = async(_id, state) => {
  await createTimer(20);
  const game = await GameInstanceDocument.findOneAndUpdate({
    _id,
  }, {
    state,
  }, {
    new: true,
  });
};

exports.createGame = async(req, res, next) => {
  // LEGACY, USED TO MANUALLY CREATE GAMES WITH POST ROUTE. FUNCTIONALITY MOVED TO .joinGame

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
    const newGame = await (new GameInstanceDocument()).save();
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
  // If there are the minimum amount of players required for a game, start the game timer
  if (updatedGameReference.players.length === config.minUsers) {
    waitForPlayersAndStartGame(updatedGameReference._id, 'playing');
  }

  // If there are enough players in the instance start the game
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

// exports.listGames = async(req, res) => {
//   const activeGames = await GameInstanceDocument.find({
//     state: 'waiting',
//   });
//   return res.json(activeGames);
// };

exports.getActiveGame = async(req, res) => {
  const playerId = req.session.passport.user;

  const activeGames = await GameInstanceDocument.find({
    $or: [{
      state: 'waiting',
    }, {
      state: 'playing',
    }],
    'players.user': playerId,
  });
  console.log(`Active Games: ${activeGames}`);
  if (activeGames.length > 0) {
    return res.json({
      gameInstance: {
        gameInstanceId: activeGames[0]._id,
      },
    });
  }
  return res.json(false);
};

exports.leaveGame = async(req, res, next) => {
  const playerId = req.session.passport.user;
  const gameInstanceId = req.params.gameInstance;

  // validate the user and save the reference
  // const playerReference = await User.find({
  //   _id,
  // });
  // find the newly created game instance and add the first user
  let updatedGameReference = await GameInstanceDocument.findOneAndUpdate({
    _id: gameInstanceId,
    // 'players.user': playerId,
  }, {
    $pull: {
      players: {
        user: playerId,
      },
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
  return res.redirect('/game');
};