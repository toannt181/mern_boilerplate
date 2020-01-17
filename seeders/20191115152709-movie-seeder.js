const seed = require('../crawling/seed')

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('movies', seed(), {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('movies', null, {})
  },
}
