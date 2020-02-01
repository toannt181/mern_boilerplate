const { Router } = require('express')

// const { model } = require('../db')

const route = new Router()

async function index(req, res) {
  res.json(req.user)
}

route.get('/', index)

module.exports = route
