class CacheService {
  constructor({ redisRepository }) {
    this._redisRepository = redisRepository;
  }

  async set(key, value, expiresAfter) {
    await this._redisRepository.set(key, value, expiresAfter);
  }

  async get(key) {
    return this._redisRepository.get(key);
  }

  async delete(key) {
    await this._redisRepository.delete(key);
  }
}

module.exports = CacheService;
