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
    thumbnail,
    isDeleteThumbnail,
  } = req.body

  let newThumbnail
  if (req.file) {
    newThumbnail = req.file.filename
  } else if (isDeleteThumbnail) {
    newThumbnail = null
  }

  const result = await model.User.update({ _id }, {
    name,
    telNo,
    gender,
    organizationName,
    comment,
    ...(newThumbnail !== undefined && {thumbnail: newThumbnail}),
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
