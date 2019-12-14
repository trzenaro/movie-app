const { createContainer, asClass, asValue } = require('awilix');
const {
  AuthenticationService,
  CacheService,
  CategoryService,
  ItemService,
  UserService,
} = require('../domain/services');
const { RedisRepository } = require('../infrastructure');

const defaultContainer = createContainer();
defaultContainer.register({
  authenticationService: asClass(AuthenticationService),
  cacheService: asClass(CacheService).singleton(),
  categoryService: asClass(CategoryService),
  itemService: asClass(ItemService),
  redisRepository: asClass(RedisRepository),
  userService: asClass(UserService),
});

const resolveScopedContainer = (name) => {
  const scopedContainer = defaultContainer.createScope();
  return scopedContainer.resolve(name);
};

const resolveScopedContainerFromRequest = (req, name) => {
  const scopedContainer = defaultContainer.createScope();
  scopedContainer.register({ user: asValue(req.user) });
  return scopedContainer.resolve(name);
};

module.exports = {
  resolveScopedContainer,
  resolveScopedContainerFromRequest,
};
