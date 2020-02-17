const moongose = require('mongoose')
const bcrypt = require('bcrypt')

const randomColor = require('../utils/randomColor')

const SALT_ROUND = 10
const MODEL_NAME = 'user'

function setRunValidators() {
  this.setOptions({ runValidators: true })
}

moongose.plugin((schema) => {
  schema.pre('findOneAndUpdate', setRunValidators)
  schema.pre('updateMany', setRunValidators)
  schema.pre('updateOne', setRunValidators)
  schema.pre('update', setRunValidators)
})

const schema = new moongose.Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  lastActiveDate: {
    type: Date,
  },
  status: {
    type: Number,
    default: 2,
  },
}, { timestamps: true })


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

schema.virtual('thumbnailPath')
  .get(function () {
    return this.thumbnail ? `${process.env.SERVER_URL}/${this.thumbnail}` : ''
  })

schema.virtual('info')
  .get(function () {
    return {
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      thumbnail: this.thumbnailPath,
      _id: this._id,
    }
  })

schema.virtual('fullInfo')
  .get(function () {
    return {
      ...this.info,
      status: this.status,
    }
  })

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
