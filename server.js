const bodyParser = require  ('body-parser'),
	  cookieParser = require('cookie-parser'),
	  express = require('express'),
	  logger = require('morgan'),
	  methodOverride = require('method-override')
	  mongoose = require('mongoose'),
	  path = require('path'),
	  app = express(),
	  db = mongoose.connection,
	  PORT = 4012 || process.env.PORT,



mongoose.connect('mongodb://localhost/acronauts');

db.on('error', function(err) {
    console.log(`Connection error: ${err}`);
});

db.once('open', function() {
    console.log('Housten, we have a connection!');
});



app.use(express.static(path.join(__dirname , 'public')))



app.get('/', function(req, resp) {
	resp.sendFile(__dirname + '/public/login.html')
});




app.listen(PORT, () => {
	console.log(`Localhost:${PORT}`)
})
