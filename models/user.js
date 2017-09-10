var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var minute = require('mongoose-minute');
UserSchema = new Schema({
	id: {
		type: String,
		minlength: 36
	}
});
minute(UserSchema, {
  createdAt: 'createdAt'
});
Users = mongoose.model('User', UserSchema);
module.exports = Users;