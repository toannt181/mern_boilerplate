const { Router } = require('express')
const { model } = require('../db')
const resizeImage = require('../middlewares/resizeImage')

const route = new Router()

async function index(req, res, next) {
  try {
    const {
      _id,
      name,
      avatar,
      comment,
      gender,
      organizationName,
      telNo,
      thumbnailPath,
      isVerified,
    } = req.user

    const result = {
      _id,
      name,
      avatar,
      comment,
      gender,
      organizationName,
      telNo,
      thumbnail: thumbnailPath,
      isVerified,
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

async function store(req, res, next) {
  try {
    const { _id } = req.user
    const {
      name,
      telNo,
      gender,
      organizationName,
      comment,
      isDeleteThumbnail,
    } = req.body

    const newThumbnail = {}
    if (req.file) {
      newThumbnail.thumbnail = req.file.filename
    } else if (isDeleteThumbnail === 'true') {
      newThumbnail.thumbnail = null
    }

    const result = await model.User.update({ _id }, {
      name,
      telNo,
      gender,
      organizationName,
      comment,
      ...newThumbnail,
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
}

async function deleteThumbnail(req, res, next) {
  try {
    const { _id } = req.user
    const result = await model.User.update({ _id }, { thumbnail: null })
    res.json(result)
  } catch (error) {
    next(error)
  }
}

route.get('/', index)
route.post('/', resizeImage, store)
route.delete('/thumbnail', deleteThumbnail)

module.exports = route
