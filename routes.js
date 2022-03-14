import { app } from './config/server.js'
import Home from './controllers/home.js'
import Login from './controllers/login.js'
import Logout from './controllers/logout.js'
import Register from './controllers/register.js'
const routes = {
  init: function () {
    app.use('/', Home)
    app.use('/home', Home)
    app.use('/Login', Login)
    app.use('/logout', Logout)
    app.use('/register', Register)
    app.get('*', (req, res, next) => {
      res.render('404.html', { title: '404', message: 'Page Not Found' })
    })
  }
}
export {
  app, routes
}
