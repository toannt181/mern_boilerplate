const { Router } = require('express')

const { model } = require('../db')
const { getMovieUrl, isExpiredMovie } = require('../utils/getLinkDrive')
const common = require('../constants/common')

const route = new Router()

async function index(req, res, next) {
  try {
    const { p } = req.query
    const page = Number(p) > 0 ? Number(p) : 1

    const data = await model.movies.findAll({
      offset: common.paginate.limit * (page - 1),
      limit: common.paginate.limit,
      order: [['createdAt', 'DESC']],
    })
    res.json({ data })
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

    if (!data) {
      res.json(null)
      next(new Error('404'))
      return
    }

    res.json(data)
  } catch (error) {
    next(error)
  }
}

async function getChunk(req, res, next) {
  try {
    const { id } = req.params
    const data = await model.movies.findOne({
      where: { id },
    })

    if (!data) {
      res.json(null)
      next(new Error('404'))
      return
    }

    let link = null

    if (data.chunks) {
      const idList = JSON.parse(data.chunks)
      const fileId = idList[0]

      let movieLink = await model.movie_links.findOne({
        where: { fileId },
      })

      if (!movieLink) {
        movieLink = await model.movie_links.create({ fileId })
      } else {
        link = movieLink.link
      }

      let isAlive = true

      if (link) {
        isAlive = !isExpiredMovie(link)
      }

      if (!link || !isAlive) {
        try {
          link = await getMovieUrl(fileId)
          movieLink.update({ link })
        } catch (e) {
          console.error(e)
        }
      }
    }

    res.json({ link })
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.get('/:id', show)
route.post('/:id/chunks', getChunk)

module.exports = route
