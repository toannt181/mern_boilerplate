const socketio = require('socket.io')

let io

function config(server) {
  io = socketio.listen(server)

  io.on('connection', (socket) => {
    console.log('user login: ', socket.id)

    socket.on('join', ({ channelId }) => {
      console.log('user join channe: ', channelId)
      socket.join(channelId)
    })

    socket.on('send-new-message', ({ channelId, message }) => {
      socket.broadcast.to(channelId).emit('receive-new-message', { message })
    })
  })
}

module.exports = { io, config }
