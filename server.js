// Declare Dependencies 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Declare database models
require('./user/model');
require('./game/gameInstance/model');
require('./game/round/model');
require('./game/status/model');

// Create Express server
const app = express();
const PORT = process.env.PORT || 4012;
// Define public directory
app.use(express.static(path.join(__dirname, 'public')));
// Define BodyParser
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
// Persistent user sessions - TODO - MOVE TO REDIS  
app.use(session({
  secret: process.env.SECRET || 'abc123',
  key: process.env.KEY || 'xyz',
  resave: false,
  saveUninitialized: false,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// Load passport strategies
require('./user/passport/passport.js')(passport);

// Define handlebars for static pages
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Define Express Routes
require('./user/routes')(app, passport);
require('./game/index')(app);


// Connect to the database
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/acronauts');


db.on('error', (err) => {
  console.log(`Connection error: ${err}`);
});

// Start the Express server when connected
db.once('open', () => {
  console.log('Houston, we have a connection!');
  app.listen(PORT, () => {
    console.log(`Localhost:${PORT}`);
  });
});
