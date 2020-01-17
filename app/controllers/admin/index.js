const { Router } = require('express')
const passport = require('passport')
const adminMovies = require('./controllers/adminMovies')
const dashboard = require('./controllers/dashboard')
const adminGenre = require('./controllers/adminGenre')
const profile = require('./controllers/profile')
const authenticateMiddleware = require('./middlewares/authenticate')

const route = new Router()

route.use('/dashboard', authenticateMiddleware, dashboard)
route.use('/movies', authenticateMiddleware, adminMovies)
route.use('/genres', authenticateMiddleware, adminGenre)
route.use('/profile', authenticateMiddleware, profile)

async function login(req, res, next) {
  try {
    const { e } = req.query

    if (req.user) {
      res.redirect('/admin/dashboard')
      return
    }
    res.render('admins/login', { error: !!e })
  } catch (error) {
    next(error)
  }
}

route.post(
  '/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/admin?e=1',
    },
  ),
)

route.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/admin')
})

route.get('/', login)

module.exports = route
