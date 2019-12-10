const redis = require('redis');
const { promisify } = require('util');
const { redis: redisConfig } = require('../config');

class RedisRepository {
    constructor() {
        this._redisClient = redis.createClient(redisConfig.connection);
        this._redisClient.on('connect', () => console.log('connected to Redis'));
        this._redisClient.on('error', (error) => console.error('REDIS ERROR', error));
        this._getAsync = promisify(this._redisClient.get).bind(this._redisClient);
        this._setAsync = promisify(this._redisClient.set).bind(this._redisClient);
        this._deleteAsync = promisify(this._redisClient.del).bind(this._redisClient);
    }

    async get(key) {
        return JSON.parse(await this._getAsync(key));
    }

    async set(key, value, expireAfter) {
        await this._setAsync(key, JSON.stringify(value), 'EX', expireAfter)
    }

    async delete(key) {
        await this._deleteAsync(key);
    }
}

module.exports = RedisRepository;