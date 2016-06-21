/**
 * Created by abdo on 2016-03-26.
 */

var avis = require('./avis');
var devis = require('./devis');
exports.schema = new mongoose.Schema({
		name : String,
		desc : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		startDate : {type: Date},
		endDate : {type:Date},
		state : ['waiting','inruns','finish'],
		isActive : {type :  Boolean, default:true},

		devis : devis.schema,
		avis : avis.schema
	}
)