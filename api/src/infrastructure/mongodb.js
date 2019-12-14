const mongoose = require('mongoose');
const { mongodb } = require('../config');

mongoose.Promise = Promise;
mongoose.set('debug', mongodb.debug);
mongoose.createConnection = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(
      `${mongodb.connection}/${mongodb.database}`,
      {
        user: mongodb.user,
        pass: mongodb.password,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: mongodb.autoIndex,
      },
    );
  }
};

module.exports = mongoose;
