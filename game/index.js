const gameInstance = require('./gameInstance/controller');
const round = require('./round/controller');
const user = require('../user/controller');
const gameEngine = require('./gameEngine');
const path = require('path');

const isLoggedIn = user.isLoggedIn;

module.exports = (app) => {
  app.route('/api/games/:gameInstance')
    .get(isLoggedIn, gameEngine.getStatus)
    .post(isLoggedIn, gameEngine.submitAnswerOrVote)
    .delete(isLoggedIn, gameInstance.leaveGame);
  // .put(isLoggedIn, round.createNewRound);

  app.route('/api/games')
    .get(isLoggedIn, gameInstance.getActiveGame)
    .post(isLoggedIn, gameInstance.joinGame);


  app.get('/game', isLoggedIn,
    (req, res) => {
      if (req.user) {
        res.sendFile(path.join(__dirname, '../public/game.html'));
      }
    });
};