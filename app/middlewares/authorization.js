// const { model } = require('../db')
const passport = require('passport')
const redis = require('../../config/redis')

module.exports = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
  )(req, res, () => {
    const tokenHeader = req.headers.authorization
    const token = tokenHeader.split('Bearer ')[1]
    redis.get(token, (err, result) => {
      if (err || result) {
        next(new Error('Token expired'))
      } else {
        next()
      }
    })
  })
}
