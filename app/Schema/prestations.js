/**
 * Created by abdo on 2016-03-09.
 */
exports.schema = new mongoose.Schema({
		serviceName:{type : String, maxlength:50},
		desc:String,
		remise:String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		prix : {type : Number, default:0},
		prestataireId : {type: mongoose.Schema.Types.ObjectId}
	}
)
