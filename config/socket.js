const socketio = require('socket.io')
const chalk = require('chalk')

function config(server) {
  const io = socketio.listen(server)

  io.on('connection', (socket) => {
    console.log(chalk.yellow('Login id: %s at %s'), socket.id, socket.handshake.headers['user-agent'])

    socket.on('join', ({ channelId }) => {
      console.log(chalk.yellow('Id %s join channel %s '), socket.id, channelId)
      socket.join(channelId)
    })

    socket.on('leave', ({ channelId }) => {
      console.log(chalk.yellow('Id %s leave channel %s'), socket.id, channelId)
      socket.leave(channelId)
    })

    // socket.on('send-new-message', ({ channelId, message }) => {
    //   console.log(chalk.yellow('Emit message to channel %s'), channelId)
    //   socket.to(channelId).emit('receive-new-message', { message, channelId })
    // })
  })

  return io
}


module.exports = config
