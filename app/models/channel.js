const moongose = require('mongoose')

const MODEL_NAME = 'channel'

const schema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [{
      userId: {
        type: moongose.Types.ObjectId,
        require: true,
      },
      role: {
        type: Number,
        require: true,
      },
      status: {
        type: Number,
        require: true,
      },
      lastReadMessageId: {
        type: moongose.Types.ObjectId,
        default: null,
      },
      isFavorite: {
        type: Boolean,
        default: false,
      },
    }],
    default: [],
  },
}, { timestamps: true })

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
