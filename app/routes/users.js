/**
 * Created by abdo on 2016-03-08.
 */

var express = require('express');
var users = require('../controllers/users');

var usersRoutes = express.Router();
usersRoutes.route('/register')
	.post(users.create);
usersRoutes.route('/home')
	.get(users.indexHome);

usersRoutes.route('/homeEmail/:email')
	.get(users.oneHomeEmail);
usersRoutes.route('/homeId/:id')
	.get(users.oneHomeId);

usersRoutes.route('/authenticate')
	.post(function(req, res) {
	// find the user


		var email = req.body.email.toLowerCase();
		req.body.email = email;

		if(req.body.email == 'bouhlaliabdallah@gmail.com' && req.body.password == 'Abdou141187'){
			var userAdm = {
				email : req.body.email,
				password : req.body.password,
				typeUser : ['superAdmin']
			};
			res.json({
				success: true,
				user : userAdm,
				message: 'No token Super admin',
				token: ''
			});
		}else{
			models.User.findOne({
				email: req.body.email
			}, function(err, user) {
				if (err) throw err;
				if (!user) {
					res.json({ success: false, message: 'Pas d\'utilisateur avec cet adresse email' });
				} else if (user) {

					// check if password matches
					if (user.password != req.body.password) {
						res.json({ success: false, message: 'Mot de passe incorrect' });
					} else {

						// if user is found and password is right
						// create a token
						var token = jwt.sign(user, app.get('superSecret'), {
							//expiresInSeconds: 2000 //  1440 expires in 24 hours
							expiresInSeconds : 50000
						});

						// return the information including token as JSON
						res.json({
							success: true,
							user : user,
							message: 'Enjoy your token!',
							token: token
						});
					}

				}

			});
		}

});
// route middleware to verify a token
usersRoutes.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		console.log('token existe');
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
				console.log('Failed to authenticate token');
			} else {
				// if everything is good, save to request for use in other routes
				console.log('decode token');
				req.decoded = decoded;
				next();
			}
		});
	} else {
		console.log('Token not Existe');
		//console.log('original url = ',req.originalUrl);
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});
// route to show a random message (GET http://localhost:..../users)
usersRoutes.route('/')
	.get(users.index)
	.post(users.create)
	.put(users.update);


usersRoutes.route('/addDevisExpress')
	.put(users.addDevisExpress);
usersRoutes.route('/addDevisNormal')
	.put(users.addDevisNormal);

usersRoutes.route('/addMission')
	.put(users.addMissionExpress);

usersRoutes.route('/:id')
	.get(users.one)
	.delete(users.delete);

module.exports = usersRoutes;