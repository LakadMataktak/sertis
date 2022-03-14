import express from 'express'
import Auth from '../helper/Auth.js'
import AjaxHome from './ajax.home.js'
/**
 * HomePage.
 * @param {express} express package.
 * @return {Object} of the express.
 */
function Home (object) {
  const { express, Auth, AjaxHome } = object
  const router = express.Router()

  router
  // Add a binding to handle '/' or '/home'
    .get('/', Auth.redirectIfNotLogged, async function (req, res) {
      // render the '/' or '/home' view

      const userData = await res.userData

      res.render('home.html', { title: 'Home', userData: userData })
    })
    // binding to handle /ajax/getCards
    .use('/ajax/getCards', Auth.verifyToken, AjaxHome.AjaxGetCards)
    // binding to handle /ajax/submitCard
    .use('/ajax/submitCard', Auth.verifyToken, AjaxHome.AjaxSubmitCard)
    // binding to handle /ajax/deleteCard
    .use('/ajax/deleteCard', Auth.verifyToken, AjaxHome.AjaxdeleteCard)
    // binding to handle /ajax/editCard
    .use('/ajax/editCard', Auth.verifyToken, AjaxHome.AjaxeditCard)
  return router
}
export default Home({ express, Auth, AjaxHome })
