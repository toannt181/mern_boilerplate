const moongose = require('mongoose')

const MODEL_NAME = 'userChannel'

const schema = new moongose.Schema({
  userId: {
    type: moongose.Types.ObjectId,
  },
  channelId: {
    type: moongose.Types.ObjectId,
  },
})

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
