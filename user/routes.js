const User = require('./controller'),
	  path = require('path');



module.exports = (app, passport) => {
	app.get('/create-account', (req, resp) => {
  		resp.render('signup');
	});

	app.post('/create-account', (req, resp) => {
	let data =req.body;
	User.createAccount(data, (status) =>{
		if(status){
			resp.redirect('/');
		}else{
			resp.redirect('/create-account');
		}
	});
	});

	app.post('/login', 
	passport.authenticate('signin', {failureRedirect: '/'}),
    (req, resp) => {
	resp.redirect('/');
	});

	app.get("/logout", function(req, res){
		req.logout();
		res.redirect("/");
	});

	app.get('/', (req, res) =>{
		if(req.user){
			res.sendFile(path.join(__dirname , '../public/index.html'));
		} else {
  			res.render('login');
		}
	})
}