// Declare Dependencies 
const bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  session = require('express-session'),
  logger = require('morgan'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  path = require('path');

// Declare database models
require('./user/model');
require('./game/gameInstance/model');
require('./game/round/model');

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
// require('./user/passport/passport.js')(passport, User);
// Define Express Routes
app.get('/', (req, resp) => {
  resp.sendFile(__dirname + '/public/login.html');
});
// require('./user')(app, passport);
require('./game')(app);
// require('./round')(app, passport);

// Connect to the database
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/acronauts');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

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