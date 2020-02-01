const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const config = require('../../config')

const connectDB = () => {
  return mongoose.connect(config.mongo.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

const models = path.join(__dirname, '../models')

const model = {}

// Bootstrap models
const files = fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))

files.forEach((file) => {
  const { initialize, name } = require(path.join(models, file))
  console.log('Model:', file)

  if (typeof initialize === 'function') {
    model[`${name[0].toUpperCase()}${name.slice(1)}`] = initialize()
  }
})

// files.forEach((file) => {
//   const { associate } = require(path.join(models, file))

//   if (typeof associate === 'function') {
//     associate(model)
//   }
// })

module.exports = {
  connectDB,
  model,
}
