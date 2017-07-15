import round from './controller';

module.exports = (app) => {
  app.route('/api/games/:gameInstance')
    .post(round.submitAnswer);
};
