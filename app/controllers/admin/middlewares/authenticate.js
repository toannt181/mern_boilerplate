module.exports = async function authenticate(req, res, next) {
  try {
    if (req.user) {
      res.locals.personal = req.user
      next()
      return
    }
    res.redirect('/admin')
  } catch (error) {
    next(error)
  }
}
