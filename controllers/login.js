import express from 'express'
import Auth from './../helper/Auth.js'
import AjaxLogin from './ajax.login.js'
/**
 * LoginPage.
 * @param {express} express package.
 * @return {Object} of the express.
 */
function Login (object) {
  const { express, AjaxLogin } = object
  const router = express.Router()

  router
  // Add a binding to handle '/login'
    .get('/', Auth.redirectIfLogged, function (req, res) {
      // render the /login view
      res.render('login.html', { title: 'Login' })
    })
    // binding to handle /ajax/submit
    .use('/ajax/submit', AjaxLogin)
  return router
}
export default Login({ express, Auth, AjaxLogin })
