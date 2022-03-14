import express from 'express'
import generator from 'generate-password'

/**
 * ajax/generatePassword.
 * @param {Object} modules.
 * @return {Object} of the express.
 */
function generatePassword (Object) {
  const { express, generator } = Object
  const router = express.Router()

  router
  // Add a binding to handle '/ajax/generatePassword'
    .post('/', function (req, res) {
      // render the /register/ajax/generatePassword view

      const password = generator.generate({
        length: 10,
        uppercase: false
      })

      res.json({ success: 1, password })
    })
  return router
}
export default generatePassword({ express, generator })
