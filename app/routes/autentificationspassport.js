/**
 * Created by abdo on 2016-03-31.
 */
module.exports = function(passport) {
	app.get('/success', function (req, res) {
		res.send({state: 'success', token: req.token ? req.token : null, newUser: req.newUser ? req.newUser : null});
	});

	app.get('/failure', function (req, res) {
		res.send({state: 'failure', user: null, message: req.message ? req.message : null});
	});

	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/success',
		failureRedirect: '/failure'
	}));

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/success',
		failureRedirect: '/failure'
	}));

	app.get('/bord', isLoggedIn, function (req, res) {
		res.render('bord.ejs', {user: req.user});
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/profil/:id', isLoggedIn, function (req, res) {
		var options = {_id: req.params.id};
		var returnResponse = function (obj) {
			if (obj.typeUser == 'client') {
				res.render('profilClient.ejs', {user: obj});

			} else {
				res.render('profil.ejs', {user: obj});
			}
		};
		models.User.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	});
}


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('login.html');
};


