const gameInstance = require('./gameInstance/controller');
const round = ('./round/controller');
const gameEngine = require('./gameEngine');

module.exports = (app) => {
  app.route('/api/games/:gameInstance')
    .get(gameEngine.getStatus);
  // .post(round.submitAnswer);

  app.route('/api/games')
    .get(gameInstance.listGames)
    .put(gameInstance.joinGame)
    .delete(gameInstance.leaveGame);
};
