const multer = require('multer')
const config = require('../../config')

const upload = multer({ dest: `${config.root}/storages/public` })

module.exports = upload.single('file')
