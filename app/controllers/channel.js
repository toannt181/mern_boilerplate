const { Router } = require('express')

const message = require('./message')
const { model } = require('../db')

const route = new Router()

async function index(req, res, next) {
  try {
    // const { _id } = req.user
    // const userChannels = await model.UserChannel.find({ userId: _id })
    // const channelIds = userChannels.map(({ channelId }) => channelId)
    // const channels = await model.Channel.find({ _id: { $in: channelIds } })
    const channels = await model.Channel.find()
    res.json(channels)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { _id } = req.user
    const { name } = req.body
    const channel = new model.Channel({ name })
    await channel.save()
    const userChannel = new model.UserChannel({ userId: _id, channelId: channel._id })
    await userChannel.save()
    res.json(channel)
  } catch (error) {
    next(error)
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params
    const data = await model.Channel.findByIdAndDelete(id)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

async function joinRoom(req, res, next) {
  try {
    const { id } = req.params
    const { socketId } = req.body
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', store)
route.post('/:id/join-room', joinRoom)
route.delete('/:id', destroy)
route.use('/:id/messages', message)

module.exports = route
