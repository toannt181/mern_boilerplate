const moongose = require('mongoose')

const MODEL_NAME = 'message'

const schema = new moongose.Schema({
  content: {
    type: String,
  },
  channelId: {
    type: moongose.Types.ObjectId,
  },
  createdBy: {
    type: moongose.Types.ObjectId,
  },
})

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
