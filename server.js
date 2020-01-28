require('dotenv').config()

const express = require('express')
const socket = require('socket.io')
const config = require('./config')
const { connectDB, model } = require('./app/db')

const { port } = config
const app = express()

app.get('/', (req, res) => {
  res.send('Connected')
})


// Bootstrap routes
require('./config/express')(app)
require('./config/passport')(app, model)
require('./config/routes')(app)

function listen() {
  const server = app.listen(port)
  app.io = socket.listen(server)
  console.log(`Express app started on port ${port}`)
}

function connect() {
  connectDB()
    .then(async () => {
      listen()
      console.log('Connection DB has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
}

connect()

module.exports = app
