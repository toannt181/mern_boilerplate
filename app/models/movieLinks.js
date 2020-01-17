const Sequelize = require('sequelize')

const { Model } = Sequelize

const TABLE_NAME = 'movie_links'

class Link extends Model { }

const initilize = (sequelize) => {
  const model = Link.init(
    {
      fileId: {
        type: Sequelize.STRING,
      },

      link: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: TABLE_NAME,
    },
  )

  return { modelName: TABLE_NAME, model }
}

const associate = () => {
}

module.exports = {
  associate,
  initilize,
}
