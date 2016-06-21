/**
 * Created by abdo on 2016-05-19.
 */
var nodemailer = require('nodemailer');

exports.index = function (req, res) {
	console.log(req.body);
// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '"Fred Foo ?" <bouhleliabdallah@yahoo.fr>', // sender address
		to: req.body.email, // list of receivers
		subject: 'Hello ?', // Subject line
		text: 'Hello world ?', // plaintext body
		html: '<b>Hello world ?</b>' // html body
	};

// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
		res.json({info : info.response});
	});

};
