/**
 * Created by abdo on 2016-05-16.
 */
var express = require('express');
var uploadDocument = require('../controllers/uploadDocument');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


var route = express.Router();
route.use(multipartMiddleware);

route.route('/upload')
	.post(multipartMiddleware, uploadDocument.uploadDocs);

route.use(function(req, res, next) {
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
route.route('/removeDoc/:id')
	.delete(uploadDocument.removeDocs);

module.exports = route;
