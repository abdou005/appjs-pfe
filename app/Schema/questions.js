/**
 * Created by abdo on 2016-03-25.
 */

exports.schema = new mongoose.Schema({
		contents : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},

	}
)

