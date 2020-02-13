const { Router } = require('express')
const mongoose = require('mongoose')
const { model } = require('../db')
const common = require('../constants/common')
const { createNewMessage } = require('../services/message')

const route = new Router({ mergeParams: true })

async function hasPermissionAccessChannelMiddleware(req, res, next) {
  try {
    const { _id: userId } = req.user
    const { id } = req.params
    const channel = await model.Channel.findOne({ _id: id, 'members._id': userId })
    if (!channel) {
      throw new Error('403')
    }
    next()
  } catch (e) {
    next(e)
  }
}

async function index(req, res, next) {
  try {
    const { id } = req.params
    const messages = await model.Message
      .aggregate([
        { $match: { channelId: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'user',
          },
        },
      ])

    const messagesWithUser = messages.map((message) => {
      const { user, ...rest } = message
      const tempUser = new model.User(user[0])
      return {
        ...rest,
        user: tempUser.info,
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
    const message = await createNewMessage({
      channelId: id,
      content,
      createdBy: _id,
      type: common.message.type.TEXT,
    })
    res.json(message)
  } catch (error) {
    next(error)
  }
}

route.get('/', hasPermissionAccessChannelMiddleware, index)

route.post('/', hasPermissionAccessChannelMiddleware, store)

module.exports = route
