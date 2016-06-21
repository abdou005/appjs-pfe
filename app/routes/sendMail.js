/**
 * Created by abdo on 2016-05-19.
 */
	
var sendMail = require('../controllers/sendMail');
app.post('/sendMail',sendMail.index);