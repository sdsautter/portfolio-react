const mongoose = require('mongoose'),
      User = mongoose.model('User');
      bcrypt = require('bcrypt'),

exports.createAccount = (data, cb) => {
    User.findOne({'email': data.email}, (err, users) =>{
        if(users){
            return cb(false)
        } else {    
            bcrypt.hash(data.password, 10, function(err, hash) {
                let newUser = new User({
                    email: data.email,
                    username: data.username,
                    password: hash
                });
                newUser.save((err, user) => {
                    if(err){
                     console.log(err); 
                     return cb(false);
                    }
                    return cb(true);
                })

            });    
        } 
    })

};

