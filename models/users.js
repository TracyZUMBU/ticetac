const mongoose = require('mongoose');


// const travelSchema = mongoose.Schema({
//   journey: { type: mongoose.Schema.Types.ObjectId, ref: 'journeys' },
//   orderDate: Date,
// });

const usersSchema = mongoose.Schema({
  name: String,
  firstName: String,
  email: String,
  password: String,
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
