const { Router } = require('express')
const mongoose = require('mongoose')
const messageController = require('./message')
const { model } = require('../db')
const common = require('../constants/common')
const { createNewMessage } = require('../services/message')

const route = new Router()

async function index(req, res, next) {
  try {
    const { user } = req

    let channelList = await model.Channel
      .aggregate([
        { $match: { 'members.userId': user._id } },
        {
          $unwind: {
            preserveNullAndEmptyArrays: true,
            path: '$members',
          },
        },
        { $match: { 'members.userId': user._id } },
        {
          $lookup: {
            from: 'messages',
            let: { channelId: '$_id', lastReadMessageId: '$members.lastReadMessageId' },
            as: 'messages',
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

    channelList = channelList.map(({ messages, ...channel }) => {
      return {
        ...channel,
        unreadMessageNumber: messages ? messages.unreadMessageNumber : 0,
      }
    })

    res.json(channelList)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { user } = req
    const { name } = req.body
    const member = {
      userId: user._id,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.JOINED,
    }
    const channel = new model.Channel({ name, members: [member] })
    await channel.save()

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
    const channel = await model.Channel.findOne({ _id: channelId })

    const hasInvited = channel.members
      .some((member) => member.userId.toString() === user._id.toString())

    if (hasInvited) {
      res.json({ success: true })
      return
    }

    const member = {
      userId: user._id,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.PENDING,
    }
    channel.members.push(member)
    await channel.save()
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
    const { user } = req
    const { id } = req.params
    const { lastReadMessageId } = req.body

    const channel = await model.Channel.findOne({ _id: id, 'members.userId': user._id })

    if (!channel) throw new Error('403')
    channel.members.forEach((member) => {
      if (member.userId.toString() === user._id.toString()) {
        member.lastReadMessageId = mongoose.Types.ObjectId(lastReadMessageId) // eslint-disable-line
      }
    })

    await channel.save()

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
route.post('/:id/last-read-message', updateLastReadMessage)
route.post('/:id/join', join)
route.use('/:id/messages', messageController)

module.exports = route
