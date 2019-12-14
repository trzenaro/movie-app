const authenticationRoutes = require('./authentication/authentication-routes');
const categoryRoutes = require('./category/category-routes');
const homeRoutes = require('./home/home-routes');
const itemRoutes = require('./item/item-routes');
const swaggerRoutes = require('./swagger/swagger-routes');
const userRoutes = require('./user/user-routes');

module.exports = [
  authenticationRoutes,
  categoryRoutes,
  homeRoutes,
  itemRoutes,
  swaggerRoutes,
  userRoutes,
];
