const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

exports.createAccount = (data, cb) => {
  User.findOne({
    email: data.email,
  }, (err, users) => {
    if (users) return cb(false);
    bcrypt.hash(data.password, 10, (err, hash) => {
      let newUser = new User({
        email: data.email,
        username: data.username,
        password: hash,
      });
      newUser.save((err, user) => {
        if (err) {
          // console.log(err);
          return cb(false);
        }
        return cb(true);
      });
    });
  });
};

exports.isLoggedIn = (req, res, next) => {
  // If the user is authenticated continue to the next function
  if (req.isAuthenticated()) return next();
  // keep track of where the user is to send back after they login
  req.session.returnTo = req.path;
  return res.redirect('/');
};
