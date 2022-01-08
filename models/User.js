const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: {
    type: String,
    required: [true, 'Please provied a name'],
  },
  email: String,
});

UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);

module.exports = User;
