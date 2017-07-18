const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../model.js');

module.exports = (passport) => {
  const checkPassword = (password, savedPassword) => {
    return bcrypt.compareSync(password, savedPassword, (err, result) => {
      return result;
    });
  };

  passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, cb) => {
    Users.findOne({
      email,
    }, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb(null, false);
      if (!checkPassword(password, user.password)) return cb(null, false);
      return cb(null, user);
    });
  }));

  passport.serializeUser((user, cb) => cb(null, user._id));

  passport.deserializeUser((_id, cb) => {
    Users.find({
      _id,
    }, (err) => {
      if (err) {
        return cb(err);
      }
      return cb(null, _id);
    });
  });
};