/**
 * Created by abdo on 2016-03-25.
 */

var questions = require('./questions');
exports.schema = new mongoose.Schema({
		title : String,
		desc : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},

		prestataireId : {type: mongoose.Schema.Types.ObjectId},
		questions : [questions.schema]
	}
)
