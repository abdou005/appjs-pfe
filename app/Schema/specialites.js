/**
 * Created by abdo on 2016-03-10.
 */
exports.schema = new mongoose.Schema({
		name : String,
		desc : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	}
)