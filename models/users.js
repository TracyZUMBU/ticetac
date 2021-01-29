const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  journey: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journeys' }],
  name: String,
  firstName: String,
  email: String,
  password: String,
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
