/**
 * Created by abdo on 2016-03-10.
 */
exports.schema = new mongoose.Schema({
		name : String,
		desc : String,
		type:['cin','patente','autre'],
		urlDoc : String,
		format : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		state : {type : Boolean, default:false},
		prestataireId : {type: mongoose.Schema.Types.ObjectId}
	}
)