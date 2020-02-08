const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = function setupPassport(model) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await model.users.findOne({ id })
      done(null, user)
    } catch (e) {
      done(e)
    }
  })

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await model.users.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }

        return done(null, user)
      } catch (e) {
        return done(e)
      }
    },
  ))
}
