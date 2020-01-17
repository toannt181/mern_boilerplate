const { Router } = require('express')
const { model } = require('../../../db')
const common = require('../../../constants/common')

const route = new Router()

async function index(req, res, next) {
  try {
    const { p } = req.query
    const page = Number(p) > 0 ? Number(p) : 1

    const data = await model.movies.findAndCountAll({
      offset: common.paginate.limit * (page - 1),
      limit: common.paginate.limit,
      order: [['createdAt', 'DESC']],
    })

    const { rows, count } = data

    res.render('admins/movies', {
      movies: rows,
      total: count,
      page,
      numberPage: Math.ceil(count / common.paginate.limit),
      user: req.user && req.user.firstName,
    })
  } catch (error) {
    next(error)
  }
}

async function show(req, res, next) {
  try {
    const { id } = req.params
    const data = await model.movies.findOne({
      where: { id },
    })
    const genres = await model.genres.findAll()
    res.render('admins/movies-detail', { data, genres, isCreateMovie: false })
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const genres = await model.genres.findAll()
    res.render('admins/movies-detail', { data: {}, genres, isCreateMovie: true })
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params
    const {
      title,
      description,
      keywords,
      casts,
      genreIds,
      chunks,
      posterPath,
      backdropPath,
    } = req.body

    await model.movies.update(
      {
        title,
        description,
        keywords,
        casts,
        genreIds,
        chunks,
        posterPath,
        backdropPath,
      },
      { where: { id } },
    )
    req.flash('success', 'Movie has been updated')
    res.redirect(`/admin/movies/${id}`)
  } catch (error) {
    req.flash('danger', 'Has error')
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const {
      title,
      description,
      keywords,
      casts,
      genreIds,
      chunks,
      posterPath,
      backdropPath,
    } = req.body

    await model.movies.create(
      {
        title,
        description,
        keywords,
        casts,
        genreIds,
        chunks,
        posterPath,
        backdropPath,
      },
    )
    req.flash('success', 'Movie has been created')
    res.redirect('/admin/movies')
  } catch (error) {
    req.flash('danger', 'Has error')
    next(error)
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params
    await model.movies.destroy({
      where: { id },
    })
    req.flash('success', 'Movies has been delete')
    res.redirect('/admin/movies')
  } catch (error) {
    req.flash('danger', 'Has error')
    next(error)
  }
}

route.get('/', index)
route.post('/', store)
route.get('/create', create)
route.get('/:id', show)
route.post('/:id', update)
route.get('/:id/delete', destroy)

module.exports = route
