var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var minute = require('mongoose-minute');
Todo = new Schema({
	todo: {
		type: String
	},
	user: {
		type: String,
		minlength: 36
	}
});
minute(Todo, {
  createdAt: 'createdAt'
});
Users = mongoose.model('Todos', Todo);
module.exports = Todos;