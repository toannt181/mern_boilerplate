const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')

module.exports = function (app, model) {
  app.use(passport.initialize())
  // app.use(passport.session())

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
      },
      async (jwtPayload, done) => {
        try {
          const user = await model.User.findById(jwtPayload._id)
          done(null, user)
        } catch (err) {
          done(err)
        }
      },
    ),
  )

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
