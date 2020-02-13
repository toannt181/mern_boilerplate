const { model } = require('../db')
const app = require('../../server')

module.exports.createNewMessage = async function ({ channelId, createdBy, type, content }) {
  const message = new model.Message({
    channelId,
    createdBy,
    type,
    content,
  })

  await message.save()

  const user = await app.model.User.findById(createdBy)

  app.io.to(channelId).emit('receive-new-message', { message: { ...message.toJSON(), user: user.info }, channelId })

  return message
}
