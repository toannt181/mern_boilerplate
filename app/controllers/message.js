const { Router } = require('express')

const { model } = require('../db')

const route = new Router({ mergeParams: true })

async function index(req, res, next) {
  try {
    const { id } = req.params
    const messages = await model.Message.find({ channelId: id })
    res.json(messages)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { id } = req.params
    const { content } = req.body
    const message = new model.Message({ channelId: id, content })
    await message.save()
    res.json(message)
  } catch (error) {
    next(error)
  }
}

route.get('/', index)

route.post('/', store)

module.exports = route
