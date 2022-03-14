import express from 'express'
import UsersModel from './../models/users.model.js'
/**
 * /ajax/RegisterPage.
 * @param {Object} express package.
 * @return {Object} of the express.
 */
function AjaxRegister (Object) {
  const { express, UsersModel } = Object
  const router = express.Router()

  router
  // Add a binding to handle '/register/ajax/submit'
    .post('/', async function (req, res) {
      // render the /register/ajax/submit view

      if (typeof req.body.username === 'undefined' || req.body.username.trim() === '') return res.json({ error: 1, error_msg: 'username can\'t be empty' })
      if (typeof req.body.password === 'undefined' || req.body.password.trim() === '') return res.json({ error: 1, error_msg: 'password can\'t be empty' })

      const userData = await UsersModel.getByUsername(req.body.username)
      if (userData) {
        return res.json({
          error: 1,
          error_msg: 'The username is already exists in the system. Please choose another one'
        })
      }

      const token = await UsersModel.add(req)
      res.cookie('userhash', token, {
        maxAge: 1000 * 60 * 60 * 24 * 1, // set cookie expire time to a day
        httpOnly: true
      })

      res.json({ success: 1, msg: '', token: token })
    })
  return router
}
export default AjaxRegister({ express, UsersModel })
