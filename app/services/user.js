const app = require('../../server')

module.exports.updateUserStatus = async function ({ userId, status }) {
  const user = await app.model.User.findOneAndUpdate({ _id: userId }, { status })

  app.io.emit('changeUserStatus', { userId, status })

  return user
}
