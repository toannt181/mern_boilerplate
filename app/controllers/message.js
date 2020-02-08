const { Router } = require('express')

const { model } = require('../db')

const route = new Router({ mergeParams: true })

async function index(req, res, next) {
  try {
    const { id } = req.params
    const messages = await model.Message.find({ channelId: id })
    const userIdList = {}
    messages.forEach((message) => {
      if (message.createdBy) {
        userIdList[message.createdBy] = true
      }
    })
    const users = await model.User.find({ _id: { $in: Object.keys(userIdList) } })
    const messagesWithUser = messages.map((message) => {
      const user = users.find(({ _id }) => _id.equals(message.createdBy))
      return {
        ...message.toJSON(),
        user: user.info,
      }
    })
    res.json(messagesWithUser)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { _id } = req.user
    const { id } = req.params
    const { content } = req.body
    const message = new model.Message({ channelId: id, content, createdBy: _id })
    await message.save()
    res.json(message)
  } catch (error) {
    next(error)
  }
}

route.get('/', index)

route.post('/', store)

module.exports = route
