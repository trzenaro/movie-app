const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');

const login = async (req, res) => {
  const authenticationService = await resolveScopedContainerFromRequest(req, 'authenticationService');
  const token = await authenticationService.login(req.body);
  res.json(token);
};

module.exports = {
  login,
};
