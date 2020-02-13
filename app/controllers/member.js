const { Router } = require('express')
const app = require('../../server')

const route = new Router()

async function index(req, res, next) {
  try {
    const { _id } = req.user
    const users = await app.model.User
      .find({ _id: { $ne: _id } })
    const result = users.map((user) => user.fullInfo)

    res.json(result)
  } catch (error) {
    next(error)
  }
}

route.get('/', index)

module.exports = route
