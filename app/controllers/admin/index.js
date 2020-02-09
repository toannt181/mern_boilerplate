const { Router } = require('express')
const { model } = require('../../db')
const { config } = require('../../../config/socket')
// const passport = require('passport')
// const adminMovies = require('./controllers/adminMovies')
// const dashboard = require('./controllers/dashboard')
// const adminGenre = require('./controllers/adminGenre')
// const profile = require('./controllers/profile')
// const authenticateMiddleware = require('./middlewares/authenticate')

const route = new Router()

// route.use('/dashboard', authenticateMiddleware, dashboard)
// route.use('/movies', authenticateMiddleware, adminMovies)
// route.use('/genres', authenticateMiddleware, adminGenre)
// route.use('/profile', authenticateMiddleware, profile)

// async function login(req, res, next) {
//   try {
//     const { e } = req.query

//     if (req.user) {
//       res.redirect('/admin/dashboard')
//       return
//     }
//     res.render('admins/login', { error: !!e })
//   } catch (error) {
//     next(error)
//   }
// }

// route.post(
//   '/login',
//   passport.authenticate(
//     'local',
//     {
//       successRedirect: '/admin/dashboard',
//       failureRedirect: '/admin?e=1',
//     },
//   ),
// )

// route.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/admin')
// })

async function index(req, res, next) {
  try {
    const setting = await model.Setting.findOne()
    res.render('admins/version', { setting })
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { version, secretKey, releaseNote } = req.body
    if (secretKey === process.env.SECRET_KEY) {
      await model.Setting.updateOne({}, { version, releaseNote })
      const io = config()
      io.emit('releaseVersion', { version, releaseNote })
    }
    res.redirect('/api/admin')
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', store)

module.exports = route
