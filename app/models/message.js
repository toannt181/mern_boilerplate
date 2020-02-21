const moongose = require('mongoose')

const MODEL_NAME = 'message'

const schema = new moongose.Schema({
  content: {
    type: String,
    default: '',
  },
  channelId: {
    type: moongose.Types.ObjectId,
    required: true,
  },
  userId: {
    type: moongose.Types.ObjectId,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
}, { timestamps: true })

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
