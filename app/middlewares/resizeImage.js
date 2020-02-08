const sharp = require('sharp')
const multer = require('multer')
const uuidv4 = require('uuid/v4')

const config = require('../../config')

const storage = multer.memoryStorage()
const upload = multer({ storage }).single('file')

const resizeImage = (buffer, filename) => sharp(buffer)
  .resize(120, 120)
  .toFormat('jpeg')
  .jpeg({ quality: 90 })
  .toFile(`${config.fileStoragePath}/${filename}`)

module.exports = (req, res, next) => {
  upload(req, res, async () => {
    try {
      const filename = uuidv4()
      const file = await resizeImage(req.file.buffer, filename)
      req.file = { ...file, filename }
      next()
    } catch (e) {
      next(e)
    }
  })
}
