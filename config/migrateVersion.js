require('dotenv').config()
const { connectDB, model } = require('../app/db')

const updateVersion = async () => {
  let setting = await model.Setting.findOne()
  if (!setting) {
    setting = new model.Setting({ version: '1.0.0', releaseNote: '' })
    setting.save()
  }
  console.log(setting)
}

function connect() {
  connectDB()
    .then(async () => {
      console.log('Connection DB has been established successfully.');
      await updateVersion()
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
}

connect()
