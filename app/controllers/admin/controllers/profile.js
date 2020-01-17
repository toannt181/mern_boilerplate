const { Router } = require('express')
const { model } = require('../../../db')

const route = new Router()

async function index(req, res, next) {
  try {
    res.render('admins/profile')
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const {
      firstName,
      lastName,
    } = req.body

    const { file } = req

    const avatar = file ? `/${file.filename}` : null

    await model.users.update(
      {
        firstName,
        lastName,
        ...(avatar && { avatar }),
      },
      { where: { id: req.user.id } },
    )
    res.redirect('/admin/profile')
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', update)

module.exports = route
