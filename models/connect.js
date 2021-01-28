const mongoose = require('mongoose');

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// URI_BDD Credentials
const username = 'lacapsule';
const password = 'passwordyaya';
const dbname = 'Ticketac';
const URI_BDD = `mongodb+srv://${username}:${password}@cluster0.9rdyy.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(URI_BDD, options, (err) => {
  console.log(err);
});

module.exports = mongoose;
