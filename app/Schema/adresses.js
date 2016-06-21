/**
 * Created by abdo on 2016-03-09.
 */
exports.schema = new mongoose.Schema({
		lieu : String,
		dep : String,
		region : String,
		location : {type: [Number]}, //long lat
		codePostal : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		InterventionArea : Number,
		isDefault : {type :  Boolean, default:false}
	}
)