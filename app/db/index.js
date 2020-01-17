const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const config = require('../../config')

const sequelize = new Sequelize(config.mysql)

const connectDB = () => sequelize.authenticate()

const models = path.join(__dirname, '../models')

const model = {}

// Bootstrap models
const files = fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))

files.forEach((file) => {
  const { initilize } = require(path.join(models, file))

  if (typeof initilize === 'function') {
    const result = initilize(sequelize)
    model[result.modelName] = result.model
  }
})

files.forEach((file) => {
  const { associate } = require(path.join(models, file))

  if (typeof associate === 'function') {
    associate(model)
  }
})

module.exports = {
  connectDB,
  model,
}
