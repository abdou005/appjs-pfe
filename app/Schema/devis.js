/**
 * Created by abdo on 2016-03-25.
 */

var offres = require('./offres');
var medias = require('./medias');
var adresses = require('./adresses');
var specialites = require('./specialites');
exports.schema = new mongoose.Schema({
		title : String,
		contents : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		dateWork : {type: Date},
		durationWork : String,
		state : ['waiting', 'confirm'],
		type : ['emergency','normal'],
		typeContact : ['auto','manual'],
		specialite : String,
		clientId : {type: mongoose.Schema.Types.ObjectId},
		prestataireId :{type: mongoose.Schema.Types.ObjectId},
		adresseDevis : adresses.schema,
		isActive : {type :  Boolean, default:true},

		medias : [medias.schema],
		offres : [offres.schema]
	}
)
