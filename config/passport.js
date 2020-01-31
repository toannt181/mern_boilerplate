const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = function (app, model) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await model.User.findById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      model.User.findOne({ email },
        (err, user) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect email' })
          }
          if (!user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect password' })
          }
          return done(null, user)
        })
    },
  ))
}
