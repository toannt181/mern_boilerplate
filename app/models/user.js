const moongose = require('mongoose')
const bcrypt = require('bcrypt')

const randomColor = require('../utils/randomColor')

const SALT_ROUND = 10
const MODEL_NAME = 'user'

const schema = new moongose.Schema({
  name: {
    type: String,
  },
  telNo: {
    type: String,
  },
  gender: {
    type: Number,
  },
  organizationName: {
    type: String,
  },
  comment: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

schema.pre('save', async function (next) {
  if (!this.avatar) {
    this.avatar = randomColor()
  }
  this.password = await bcrypt.hash(this.password, SALT_ROUND)
  next()
})

schema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
