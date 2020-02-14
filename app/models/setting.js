const moongose = require('mongoose')

const MODEL_NAME = 'setting'

const schema = new moongose.Schema({
  releaseNote: {
    type: String,
  },
  version: {
    type: String,
    default: '1.0.0',
  },
}, { timestamps: true })

const initialize = () => moongose.model(MODEL_NAME, schema)

module.exports = {
  name: MODEL_NAME,
  initialize,
}
