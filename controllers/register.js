import express from 'express'
import Auth from '../helper/Auth.js'
import generatePassword from './ajax.generatePassword.js'
import AjaxRegister from './ajax.register.js'
/**
 * RegisterPage.
 * @param {express} express package.
 * @return {Object} of the express.
 */
function Register (object) {
  const { express, Auth } = object
  const router = express.Router()

  router
  // Add a binding to handle '/register'
    .get('/', Auth.redirectIfLogged, function (req, res) {
      // render the /register view
      res.render('register.html', { title: 'Register' })
    })
    // binding to handle /ajax/submit
    .use('/ajax/submit', AjaxRegister)
    // binding to handle /ajax/generatePassword
    .use('/ajax/generatePassword', generatePassword)
  return router
}
export default Register({ express, Auth })
