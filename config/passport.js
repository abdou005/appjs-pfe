/**
 * Created by abdo on 2016-03-17.
 */
var LocalStrategy   = require('passport-local').Strategy;
//var bCrypt = require('bcrypt-nodejs');
var jwt =  require('jsonwebtoken');


module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.email);
		//var sessionUser = { _id: user._id, name: user.username, email: user.email }
		//done(null, sessionUser);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		models.User.findById(id, function(err, user) {
			console.log('deserializing user:',user.email);
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
			usernameField: 'email',
			passwordField : 'password',
			passReqToCallback : true
		},
		function(req, email, password, done) {
			if(email)
				email = email.toLowerCase();

			models.User.findOne({ 'email' :  email },
				function(err, user) {
					// In case of any error, return using the done method
					if (err)
						return done(err);
					// Username does not exist, log the error and redirect back
					if (!user){
						console.log('User Not Found with username ' + email);
						return done('Invalid Email', false, {message: 'Invalid Email'});
					}
					// User exists but wrong password, log the error
					if (user.password != password){
						console.log('Invalid Password');
						return done(null, false, {message: 'Invalid Password'}); // redirect back to login page
					}
					// User and password both match, return user from done method
					// which will be treated like success
					var token = jwt.sign(user, config.secret, {
						expiresIn: 10080 // in seconds
					});
					console.log(token);
					return done(null, user);
					return token;
					console.log(user);
				}
			);
		}
	));

	passport.use('signup', new LocalStrategy({
				usernameField: 'email',
				passwordField : 'password',
				passReqToCallback : true // allows us to pass back the entire request to the callback
			},
			function(req, email, password, done) {
				if(email)
					email = email.toLowerCase();
				models.User.findOne({ 'email' :  email }, function(err, user) {
					// In case of any error, return using the done method
					if (err){
						console.log('Error in SignUp: '+err);
						return done(err,{message: 'User already exists with email'});
					}
					// already exists
					if (user) {
						console.log('User already exists with email: ' + email);
						return done(null, {message: 'User already exists with email'});
					} else {
						// if there is no user, create the user
						var newUser = new models.User();
						newUser.email = email;
						newUser.password = password;
						console.log(newUser)
						// save the user
						newUser.save(function(err) {
							if (err){
								console.log('Error in Saving user: ' + err);
								throw err;
							}
							console.log(newUser.email + ' Registration succesful');
							return done(null, newUser);
						});
					}
				});
			})
	);


	/*var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
	 var bCrypt = require('bcrypt-nodejs');
	 users.methods.generateHash = function(password){
	 return bCrypt.hashSync(password,bCrypt.genSaltSync(9));
	 };
	 users.methods.validPassword = function(password){
	 return bCrypt.compareSync(password, this.password);
	 };
	*/

};