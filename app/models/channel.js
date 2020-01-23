const moongose = require('mongoose')

const MODEL_NAME = 'channel'

const schema = new moongose.Schema({
  name: {
    type: String,
  },
})

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
