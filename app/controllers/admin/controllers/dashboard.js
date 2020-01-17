const { Router } = require('express')
// const { model } = require('../../../db')

const route = new Router()

async function index(req, res, next) {
  try {
    res.render('admins/dashboard')
  } catch (error) {
    next(error)
  }
}

route.get('/', index)

module.exports = route
