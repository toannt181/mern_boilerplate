const { Router } = require('express')

const message = require('./message')
const { model } = require('../db')

const route = new Router()

async function index(req, res, next) {
  try {
    const { _id } = req.user
    const userChannels = await model.UserChannel.find({ userId: _id })
    const channelIds = userChannels.map(({ channelId }) => channelId)
    const channels = await model.Channel.find({ _id: { $in: channelIds } })
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

async function show(req, res, next) {
  try {
    const { id } = req.params
    const data = await model.movies.findOne({
      where: { id },
    })

    if (!data) {
      res.json(null)
      next(new Error('404'))
      return
    }

    res.json(data)
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', store)
route.get('/:id', show)
route.use('/:id/messages', message)

module.exports = route
