const Sequelize = require('sequelize')

const { Model } = Sequelize

const TABLE_NAME = 'genres'

class Genre extends Model { }

const initilize = (sequelize) => {
  const model = Genre.init(
    {
      title: {
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
  // db.movies.hasOne(db.episodes)
}

module.exports = {
  initilize,
  associate,
}
