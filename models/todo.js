var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var minute = require('mongoose-minute');
Todo = new Schema({
	todo: {
		type: String
	},
	userId: {
		type: String,
		minlength: 36
	},
	attachment: [{
		name: String,
		url: String,
		fieldType:String,
		originalName: String
	}],
	archive: {
		type: Boolean,
		default: false
	}
});
minute(Todo, {
  createdAt: 'createdAt'
});
Todos = mongoose.model('Todos', Todo);
module.exports = Todos;