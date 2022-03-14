import express from 'express'
import UsersModel from './../models/users.model.js'
/**
 * /login/ajax/submit.
 * @param {Object} express package.
 * @return {Object} of the express.
 */
function AjaxLogin (Object) {
  const { express, UsersModel } = Object
  const router = express.Router()

  router
  // Add a binding to handle '/login/ajax/submit'
    .post('/', async function (req, res) {
      // render the /login/ajax/submit view

      if (typeof req.body.username === 'undefined' || req.body.username.trim() === '') return res.json({ error: 1, error_msg: 'username can\'t be empty' })
      if (typeof req.body.password === 'undefined' || req.body.password.trim() === '') return res.json({ error: 1, error_msg: 'password can\'t be empty' })

      const userData = await UsersModel.login(req)
      if (!userData) {
        return res.json({
          error: 1,
          error_msg: 'The username or password is incorrect.'
        })
      }

      res.cookie('userhash', userData.token, {
        maxAge: 1000 * 60 * 60 * 24 * 1, // set cookie expire in a day
        httpOnly: true
      })
      res.json({ success: 1, msg: '', token: userData.token })
    })
  return router
}
export default AjaxLogin({ express, UsersModel })
