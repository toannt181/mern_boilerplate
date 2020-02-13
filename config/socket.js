const socketio = require('socket.io')
const chalk = require('chalk')

const { updateUserStatus } = require('../app/services/user')
const common = require('../app/constants/common')

function config(server) {
  const io = socketio.listen(server)

  io.on('connection', (socket) => {
    console.log(chalk.yellow('Login id: %s at %s'), socket.id, socket.handshake.headers['user-agent'])

    socket.on('connected', async ({ userId }) => {
      socket.userId = userId // eslint-disable-line
      await updateUserStatus({ userId, status: common.user.status.ONLINE })
    })

    socket.on('join', ({ channelId }) => {
      console.log(chalk.yellow('Id %s join channel %s '), socket.id, channelId)
      socket.join(channelId)
    })

    socket.on('leave', ({ channelId }) => {
      console.log(chalk.yellow('Id %s leave channel %s'), socket.id, channelId)
      socket.leave(channelId)
    })

    socket.on('disconnect', async () => {
      console.log(chalk.yellow('Disconnect id: %s at %s'), socket.id, socket.handshake.headers['user-agent'])
      await updateUserStatus({ userId: socket.userId, status: common.user.status.OFFLINE })
    })
  })

  return io
}


module.exports = config
