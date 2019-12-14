const { mongodb } = require('./infrastructure');
const app = require('./app');
const config = require('./config');

(async () => {
  app.listen(config.apiPort, () => console.log(`app running at ${config.apiPort}`));

  await mongodb.createConnection();
  console.log('connected to MongoDB');
})();
