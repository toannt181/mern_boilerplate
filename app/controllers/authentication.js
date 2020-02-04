const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const auth = require('../middlewares/authorization')
const { model } = require('../db')
const redis = require('../../config/redis')
const { sendVerifyAccountMail } = require('../mailer')

const route = new Router()

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body
    const user = new model.User({ name, email, password })
    await user.save()
    const { _id } = user
    const key = jwt.sign({ email, _id }, 'secret', { expiresIn: 60 * 15 })
    sendVerifyAccountMail({ email, verifyLink: `${process.env.CLIENT_URL}/verify?code=${key}` })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

function login(req, res) {
  const { name, email, _id } = req.user
  const accessToken = jwt.sign({ name, email, _id }, 'secret', { expiresIn: 60 * 15 })
  const refreshToken = jwt.sign({ name, email, _id }, 'secret', { expiresIn: 60 * 60 * 24 * 30 })

  res.json({ accessToken, refreshToken })
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

function renewToken(req, res, next) {
  try {
    const { refreshToken } = req.body
    const { name, email, _id } = jwt.verify(refreshToken, 'secret')
    const tokenHeader = req.headers.authorization
    const accessToken = tokenHeader.split('Bearer ')[1]
    redis.set(accessToken, true)
    redis.get(refreshToken, (error, result) => {
      if (error || result) throw new Error('Refresh token exipre')
      const newAccessToken = jwt.sign({ name, email, _id }, 'secret', { expiresIn: 60 * 15 })
      res.json({ accessToken: newAccessToken })
    })
  } catch (error) {
    next(error)
  }
}

async function verifyAccount(req, res, next) {
  try {
    const { code } = req.body
    const { _id } = jwt.verify(code, 'secret')
    await model.User.findOneAndUpdate({ _id }, { isVerified: true })
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

route.post('/login', passport.authenticate('local', { session: false }), login)
route.post('/signup', signup)
route.post('/logout', logout)
route.post('/refresh-token', auth, renewToken)
route.post('/verify', verifyAccount)

module.exports = route
