const { Router } = require('express')
const message = require('./message')
const { model } = require('../db')
const common = require('../constants/common')

const route = new Router()

async function index(req, res, next) {
  try {
    const { _id } = req.user
    const channels = await model.Channel.find({ 'members._id': _id })
    res.json(channels)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { _id } = req.user
    const { name } = req.body
    const members = [{ _id, role: common.room.role.MANAGEMENT, status: common.room.status.JOINED }]
    const channel = new model.Channel({ name, members })
    await channel.save()
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

async function invite(req, res, next) {
  try {
    const { userId } = req.body
    const { id } = req.params
    const newMember = {
      _id: userId,
      role: common.room.role.MANAGEMENT,
      status: common.room.status.PENDING,
    }
    const channel = await model.Channel.findById(id)
    if (!channel.members.find((item) => item._id.toString() === userId)) {
      channel.members.push(newMember)
      await channel.save()
    }
    res.json(channel)
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
    const channel = await model.Channel.findById(id)
    const member = channel.members.find((item) => item._id.toString() === _id)
    if (member) {
      member.status = common.room.status.JOINED
      await channel.save()
    }
    res.json(channel)
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', store)
route.delete('/:id', destroy)
route.post('/:id/invite', invite)
route.post('/:id/kickout', kickout)
route.post('/:id/join', join)
route.use('/:id/messages', message)

module.exports = route
