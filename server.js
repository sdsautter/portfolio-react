// Declare Dependencies 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');

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

app.listen(PORT, () => {
    console.log(`Localhost:${PORT}`);
  });
