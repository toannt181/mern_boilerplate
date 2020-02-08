const express = require('express')
// const session = require('express-session')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
// const FileStore = require('session-file-store')(session)
// const flash = require('flash')
// const requireHttps = require('./middlewares/require-https')
const config = require('.')


const env = process.env.NODE_ENV || 'development'

module.exports = function (app) {
  app.use(helmet())
  // app.use(requireHttps)

  // Compression middleware (should be placed before express.static)
  app.use(
    compression({
      threshold: 512,
    }),
  )

  app.use(
    cors({
      // origin: ['http://localhost:3000', 'https://reboil-demo.herokuapp.com'],
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      credentials: true,
    }),
  )

  // Static files middleware
  app.use(express.static(`${config.root}/public`))
  app.use(express.static(`${config.root}/storages/public`))

  // Use winston on production
  app.use(morgan('tiny'))

  // set views path, template engine and default layout
  app.set('views', `${config.root}/app/views`)
  app.set('view engine', 'pug')

  // expose package.json to views
  app.use((req, res, next) => {
    res.locals.env = env
    next()
  })

  // bodyParser should be above methodOverride
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  // app.use(session({
  //   secret: 'keyboard cat',
  //   store: new FileStore({}),
  //   resave: false,
  //   saveUninitialized: false,
  //   duration: 30 * 60 * 1000,
  // }))
  // app.use(flash())
}
