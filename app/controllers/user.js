const { Router } = require('express')

// const { model } = require('../db')
const auth = require('../middlewares/authorization')

const route = new Router()

async function index(req, res) {
  res.json(req.user)
}

route.get('/', auth, index)

module.exports = route
