const Sequelize = require('sequelize')

const { Model } = Sequelize

const TABLE_NAME = 'movies'

class Movie extends Model { }

const initilize = (sequelize) => {
  const model = Movie.init(
    {
      title: {
        type: Sequelize.STRING,
      },

      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },

      type: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      posterPath: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      backdropPath: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      votePoint: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      voteCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      genreIds: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      keywords: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      casts: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      chunks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      releaseDate: {
        type: Sequelize.DATE,
        allowNull: true,
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
  initilize,
  associate,
}
