const packageConfig = require('../../../package.json');

const getApiInformation = (req, res) => {
  res.json({
    name: packageConfig.name,
    description: packageConfig.description,
    version: packageConfig.version,
  });
};

const getHealth = (req, res) => {
  res.send('ok');
};

module.exports = {
  getApiInformation,
  getHealth,
};
