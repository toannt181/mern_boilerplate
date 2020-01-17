const { Router } = require('express')
const { model } = require('../../../db')

const route = new Router()

async function index(req, res, next) {
  try {
    const data = await model.genres.findAndCountAll({
      order: [['createdAt', 'DESC']],
    })
    const { rows, count } = data

    res.render('admins/genres', {
      genres: rows,
      total: count,
      user: req.user && req.user.firstName,
    })
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const title = req.body.title.trim()
    const genre = await model.genres.findOne({
      where: { title },
    })
    if (genre) {
      req.flash('warning', `Genre "${title}" is duplicated`)
    } else {
      await model.genres.create({
        title,
      })
      req.flash('success', `Genre "${title}" has been created`)
    }
    res.redirect('/admin/genres')
  } catch (error) {
    req.flash('danger', 'Has error')
    next(error)
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params
    await model.genres.destroy({
      where: { id },
    })
    req.flash('success', 'Genre has been delete')
    res.redirect('/admin/genres')
  } catch (error) {
    req.flash('danger', 'Has error')
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params
    const { title } = req.body
    await model.genres.update(
      { title },
      { where: { id } },
    )
    req.flash('success', 'Genre has been updated')
    res.redirect('/admin/genres')
  } catch (error) {
    req.flash('danger', 'Has error')
    next(error)
  }
}

route.get('/', index)
route.post('/', store)
route.get('/:id/delete', destroy)
route.post('/:id', update)

module.exports = route
