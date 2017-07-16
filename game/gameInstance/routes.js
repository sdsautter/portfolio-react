const gameInstanceController = require('./controller');

module.exports = (app) => {
  app.route('/api/games')
    .get(gameInstanceController.listGames)
    .post(gameInstanceController.createGame,
      gameInstanceController.joinGame)
    .put(gameInstanceController.joinGame)
    .delete(gameInstanceController.leaveGame);
};
