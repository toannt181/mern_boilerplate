const Sequelize = require('sequelize')

const { Model } = Sequelize

const TABLE_NAME = 'users'

class User extends Model {
  validPassword(password) {
    return this.password === password
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

const initilize = (sequelize) => {
  const model = User.init(
    {
      firstName: {
        type: Sequelize.STRING,
      },

      lastName: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },

      password: {
        type: Sequelize.STRING,
      },

      avatar: {
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
  initilize,
  associate,
}
