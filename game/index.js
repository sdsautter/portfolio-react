const gameInstance = require('./gameInstance/controller');
const round  = require('./round/controller');
const user = require('../user/controller');
const gameEngine = require('./gameEngine');
const isLoggedIn = user.isLoggedIn;

module.exports = (app) => {
  app.route('/api/games/:gameInstance')
    .get(isLoggedIn, gameEngine.getStatus)
    .post(isLoggedIn, round.submitAnswer)
    .put(isLoggedIn, round.createNewRound);

  app.route('/api/games')
    .get(isLoggedIn, gameInstance.listGames)
    .put(isLoggedIn, gameInstance.joinGame)
    .delete(isLoggedIn, gameInstance.leaveGame);
};
