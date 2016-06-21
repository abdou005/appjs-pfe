
var express = require('express');
var domaines = require('../controllers/domaines');
var domainesRoutes = express.Router();
domainesRoutes.route('/')
	.get(domaines.index);
domainesRoutes.route('/:id')
	.get(domaines.one)

domainesRoutes.use(function(req, res, next) {
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
domainesRoutes.route('/')
	.post(domaines.create)
	.put(domaines.update);

domainesRoutes.route('/:id')
	.delete(domaines.delete);

module.exports = domainesRoutes;