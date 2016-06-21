/**
 * Created by abdo on 2016-03-26.
 */


exports.schema = new mongoose.Schema({
		object : String,
		contents : String,
		from : String,
		to :String,
		read : Boolean,

		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	}
)