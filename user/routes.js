const User = require('./controller');
const path = require('path');

module.exports = (app, passport) => {
  app.get('/create-account', (req, res) => {
    res.render('signup');
  });

  app.post('/create-account', (req, resp) => {
    let data = req.body;
    User.createAccount(data, (status) => {
      if (status) {
        resp.redirect('/login');
      } else {
        resp.redirect('/create-account');
      }
    });
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login',
    passport.authenticate('signin', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      if (req.session.returnTo != null) return res.redirect(req.session.returnTo);
      return res.redirect('/game');
    });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
};