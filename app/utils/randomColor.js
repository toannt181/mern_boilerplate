const { random } = require('lodash')

const COLOR_LIST = [
  '6cba7a',
  '577bea',
  'fce07e',
  'e15d57',
]

module.exports = function randomColor() {
  return COLOR_LIST[random(0, 3)]
}
