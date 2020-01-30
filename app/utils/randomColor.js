const { random } = require('lodash')

const MAX_HEX_COLOR = 16777215

module.exports = function randomColor() {
  return random(0, MAX_HEX_COLOR).toString(16)
}
