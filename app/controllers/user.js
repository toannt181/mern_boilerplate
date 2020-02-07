const { Router } = require('express')

const { model } = require('../db')

const route = new Router()

async function index(req, res) {
  res.json(req.user)
}

async function store(req, res) {
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
}

async function updateThumbnail(req, res) {
  const { _id } = req.user
  if (req.file) {
    const thumbnail = req.file.filename
    const result = await model.User.update({ _id }, { thumbnail })
    res.json(result)
    return
  }
  res.json({ error: 'Missing file' })
}

async function deleteThumbnail(req, res) {
  const { _id } = req.user
  const result = await model.User.update({ _id }, { thumbnail: null })
  res.json(result)
}

route.get('/', index)
route.post('/', store)
route.post('/thumbnail', updateThumbnail)
route.delete('/thumbnail', deleteThumbnail)

module.exports = route
