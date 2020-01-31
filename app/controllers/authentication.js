const { Router } = require('express')
const passport = require('passport')
const { model } = require('../db')

const route = new Router()

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body
    const user = new model.User({ name, email, password })
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
}

function login(req, res) {
  console.log('haha')
  res.json(req.user)
}

route.post('/login', passport.authenticate('local'), login)
route.post('/signup', signup)

module.exports = route
