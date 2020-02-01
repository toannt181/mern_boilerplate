const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { model } = require('../db')
const redis = require('../../config/redis')

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
  const { name, email, _id } = req.user
  const token = jwt.sign({ name, email, _id }, 'secret', { expiresIn: 60 * 15 })
  res.json(token)
}

function logout(req, res, next) {
  try {
    const tokenHeader = req.headers.authorization
    const token = tokenHeader.split('Bearer ')[1]
    try {
      jwt.verify(token, 'secret')
      redis.set(token, true)
      res.json({ success: true })
    } catch (e) {
      res.json({ success: true })
    }
  } catch (error) {
    next(error)
  }
}

route.post('/login', passport.authenticate('local', { session: false }), login)
route.post('/signup', signup)
route.post('/logout', logout)

module.exports = route
