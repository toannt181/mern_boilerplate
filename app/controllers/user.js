const { Router } = require('express')

const { model } = require('../db')
const auth = require('../middlewares/authorization')

const route = new Router()

async function index(req, res) {
  res.json(req.user)
}

async function store(req, res, next) {
  try {
    const { name } = req.body
    const user = new model.User({ name })
    user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
}

route.get('/', auth, index)
route.post('/', store)

module.exports = route
