const moongose = require('mongoose')
const randomColor = require('../utils/randomColor')

const MODEL_NAME = 'user'

const schema = new moongose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
})

schema.pre('save', function (next) {
  if (!this.avatar) {
    this.avatar = randomColor()
  }
  next()
})

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
