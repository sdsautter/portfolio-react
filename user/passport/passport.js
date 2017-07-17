const bcrypt = require('bcrypt'),
    LocalStrategy = require('passport-local').Strategy;
    Users = require('../model.js');


module.exports = function(passport) {
    const checkPassword = function(password, savedPassword) {
         return bcrypt.compareSync(password, savedPassword, (err, result) => {
             return result;
        });
    }

    passport.use('signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        function(email, password, cb) {
            Users.findOne({ 'email': email }, (err, user) => {

                if (err) {return cb(err); }

                if (!user) { return cb(null, false); }
                if (!checkPassword(password, user.password)) { return cb(null, false); }
                return cb(null, user);

            });

        }));


    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });


    passport.deserializeUser(function(id, cb) {
        Users.find({ '_id': id }, (err, user) => {
            if (err) { return cb(err); }
            cb(null, id);
        });
    });
};