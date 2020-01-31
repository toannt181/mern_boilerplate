// const { model } = require('../db')
const passport = require('passport')

module.exports = passport.authenticate('jwt', { session: false })

// async function hasAuthorization(req, res, next) {
//     const { authorization } = req.headers

//     try {
//       if (!authorization) {
//         throw new Error('401')
//       }

//       const user = await model.User.findById(authorization)
//       if (!user) {
//         throw new Error('401')
//       }

//       req.user = user
//       next()
//     } catch (e) {
//       next(e)
//     }
//   }
