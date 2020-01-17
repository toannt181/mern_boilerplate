const passport = require('passport')
const local = require('./passport/local')

module.exports = function (app, model) {
  app.use(passport.initialize())
  app.use(passport.session())
  local(model)
}
