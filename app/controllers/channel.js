const { Router } = require('express')
const mongoose = require('mongoose')
const messageController = require('./message')
const { model } = require('../db')
const common = require('../constants/common')
const { createNewMessage } = require('../services/message')

const route = new Router()

async function index(req, res, next) {
  try {
    const { channels } = req.user

    const channelIdList = channels.map(({ _id: channelId }) => channelId)

    const countUnreadNumberMessage = await model.Channel
      .aggregate([
        { $match: { _id: { $in: channelIdList } } },
        {
          $lookup: {
            from: 'messages',
            let: { channelId: '$_id' },
            as: 'messages',
            pipeline: [
              { $match: { $expr: { $eq: ['$channelId', '$$channelId'] } } },
              { $group: { _id: '$channelId', unreadMessageNumber: { $sum: 1 } } },
            ],
          },
        },
        {
          $unwind: {
            preserveNullAndEmptyArrays: true,
            path: '$messages',
          },
        },
      ])

    res.json(countUnreadNumberMessage)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { name } = req.body
    const channel = new model.Channel({ name })
    await channel.save()

    const member = {
      _id: channel._id,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.JOINED,
    }
    req.user.channels.push(member)
    await req.user.save()
    res.json({ success: true })
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

    const hasInvited = user.channels.some((channel) => channel._id.toString() === id.toString())

    if (hasInvited) {
      res.json({ success: true })
      return
    }

    const member = {
      _id: channelId,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.PENDING,
    }
    user.channels.push(member)
    await user.save()
    await createNewMessage({
      channelId,
      userId: user._id,
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
    const { _id, channels } = req.user

    const channelIndex = channels.find((channel) => channel.id.toString() === id.toString())

    if (channelIndex === -1) throw new Error('403')

    req.user.channels[channelIndex].status = common.room.status.JOINED
    await req.user.save()

    await createNewMessage({
      channelId: id,
      createdBy: _id,
      type: common.message.type.JOIN_MESSAGE,
    })
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

async function updateLastReadMessage(req, res, next) {
  try {
    const { id } = req.params
    const { channels } = req.user
    const { lastReadMessageId } = req.body

    const channelIndex = channels.find((channel) => channel.id.toString() === id.toString())

    if (channelIndex === -1) throw new Error('403')
    req.user.channels[channelIndex].lastReadMessageId = lastReadMessageId

    await req.user.save()

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
