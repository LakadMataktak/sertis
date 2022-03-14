import express from 'express'
/**
 * LogoutPage.
 * @param {express} express package.
 * @return {Object} of the express.
 */
function Logout (object) {
  const { express } = object
  const router = express.Router()

  router
  // Add a binding to handle '/logout'
    .get('/', function (req, res) {
      if (typeof req.cookies.userhash === 'undefined') return false
      res.clearCookie('userhash')
      return res.redirect(process.env.BASE_URL + 'login')
    })
  return router
}
export default Logout({ express })
