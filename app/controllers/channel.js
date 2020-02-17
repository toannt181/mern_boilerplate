const { Router } = require('express')
// const { find } = require('lodash')
const mongoose = require('mongoose')
const messageController = require('./message')
const { model } = require('../db')
const common = require('../constants/common')
const { createNewMessage } = require('../services/message')

const route = new Router()

async function index(req, res, next) {
  try {
    const { _id } = req.user

    const userChannels = await model.UserChannel
      .aggregate([
        { $match: { userId: _id } },
        {
          $lookup: {
            from: 'channels',
            let: { channelId: '$channelId' },
            pipeline: [{
              $match: {
                $expr: {
                  $eq: ['$$channelId', '$_id'],
                },
              },
            }],
            as: 'channel',
          },
        },
        {
          $unwind: '$channel',
        },
        {
          $lookup: {
            from: 'messages',
            let: { channelId: '$channelId', lastReadMessageId: '$lastReadMessageId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$channelId', '$$channelId'] },
                      { $gt: ['$_id', '$$lastReadMessageId'] },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            as: 'numberNotReadMessage',
          },
        },
        {
          $unwind: { path: '$numberNotReadMessage', preserveNullAndEmptyArrays: true },
        },
      ])

    const channels = userChannels.map(({
      messages,
      channel,
      channelId,
      status,
      role,
      lastReadMessageId,
      numberNotReadMessage,
    }) => {
      return {
        name: channel.name,
        _id: channelId,
        numberNotReadMessage: numberNotReadMessage ? numberNotReadMessage.count : 0,
        status,
        messages,
        role,
        lastReadMessageId,
      }
    })

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
    const userChannel = new model.UserChannel({
      userId: _id,
      channelId: channel.id,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.JOINED,
    })
    await userChannel.save()
    res.json(channel)
  } catch (error) {
    next(error)
  }
}

async function destroy(req, res, next) {
  try {
    const { _id: userId } = req.user
    const { id: channelId } = req.params
    await model.UserChannel.findOneAndDelete({ userId, channelId })
    await model.Channel.findByIdAndDelete(channelId)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

async function invite(req, res, next) {
  try {
    const { email } = req.body
    const { id } = req.params
    const user = await model.User.findOne({ email })
    if (!user) throw new Error('404')

    const channelId = mongoose.Types.ObjectId(id)

    const hasInvited = await model.UserChannel.findOne({
      userId: user._id,
      channelId,
    })

    if (hasInvited) {
      res.json({ success: true })
      return
    }

    const userChannel = new model.UserChannel({
      userId: user._id,
      channelId,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.PENDING,
    })
    await userChannel.save()
    await createNewMessage({
      channelId,
      createdBy: user._id,
      type: common.message.type.INVITE_MESSAGE,
    })

    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

async function kickout(req, res, next) {
  try {
    const { userId } = req.body
    const { id } = req.params
    const channel = await model.Channel.findById(id)
    const memberIndex = channel.members.findIndex((item) => item._id.toString() === userId)
    if (memberIndex !== -1) {
      channel.members.splice(memberIndex, 1)
      await channel.save()
    }
    res.json(channel)
  } catch (error) {
    next(error)
  }
}

async function join(req, res, next) {
  try {
    const { id } = req.params
    const { _id } = req.user
    const userChannel = await model.UserChannel.findOne({ userId: _id, channelId: id })
    if (userChannel) {
      userChannel.status = common.room.status.JOINED
      await userChannel.save()

      await createNewMessage({
        channelId: id,
        createdBy: _id,
        type: common.message.type.JOIN_MESSAGE,
      })
    }
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

async function updateLastReadMessage(req, res, next) {
  try {
    const { id } = req.params
    const { _id } = req.user
    const { lastReadMessageId } = req.body

    await model.UserChannel.findOneAndUpdate(
      {
        userId: _id,
        channelId: id,
      },
      {
        lastReadMessageId,
      },
    )

    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', store)
route.delete('/:id', destroy)
route.post('/:id/invite', invite)
route.post('/:id/kickout', kickout)
route.post('/:id/last-read-Message', updateLastReadMessage)
route.post('/:id/join', join)
route.use('/:id/messages', messageController)

module.exports = route
