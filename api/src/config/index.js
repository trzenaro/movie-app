const { env } = process;

module.exports = {
  apiPort: env.API_PORT,

  mongodb: {
    connection: env.MONGODB_CONNECTION,
    user: env.MONGODB_USER,
    password: env.MONGODB_PASSWORD,
    database: env.MONGODB_DATABASE,
    autoIndex: !!parseInt(env.MONGODB_AUTOINDEX, 10),
    debug: !!parseInt(env.MONGODB_DEBUG, 10),
  },

  redis: {
    connection: env.REDIS_CONNECTION,
  },

  jwt: {
    secretKey: env.JWT_SECRET_KEY,
    secretExpires: env.JWT_SECRET_EXPIRES,
    refreshSecretKey: env.JWT_REFRESH_SECRET_KEY,
    refreshSecretExpires: env.JWT_REFRESH_SECRET_EXPIRES,
  },
};
