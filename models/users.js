const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: String,
  firstName: String,
  email: String,
  password: String,
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journey' }],
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
