const { mongodb } = require('../config');
const mongoose = require('mongoose');

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
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
            }
        );
    }
};

module.exports = mongoose;
