/**
 * Created by abdo on 2016-03-26.
 */
var medias = require('./medias');
var devis = require('./devis');
exports.schema = new mongoose.Schema({
		desc : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		state : ['Waiting', 'Confirm'],
		noteQualityServ : Number,
		notePriceServ : Number,
		noteRespectPeriod : Number,
		noteContact : Number,
		noteGlobal : Number,
		photo : medias.schema,
		prestataireId : {type: mongoose.Schema.Types.ObjectId},
		clientId : {type: mongoose.Schema.Types.ObjectId},
		devisClient : devis.schema
	}
)