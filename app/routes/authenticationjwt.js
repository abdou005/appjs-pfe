
var express = require('express');
// get an instance of the router for api routes
var authRoutes = express.Router();
// route middleware to verify a token
authRoutes.use(function(req, res, next) {
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
// route to show a random message (GET http://localhost:8080/api/)
authRoutes.route('/signout')
		.delete(function(req, res) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		delete req.query.token;
			console.log('Token deleted--------!');
			res.json({ message: 'Token deleted'});

		});
// route to show a random message (GET http://localhost:8080/api/)
authRoutes.route('/token/:id')
	.get(function(req, res) {
		console.log('----------------------------');
		console.log(req.headers['x-access-token']);
		console.log('----------------------------');
		console.log(req.params.id);
		res.json({ message: 'Welcome to the coolest API on earth!' });
	});
module.exports = authRoutes;