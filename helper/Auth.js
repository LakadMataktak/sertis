import UsersModel from '../models/users.model.js'
class Auth {
  constructor (object) {
    const { UsersModel } = object
    this.UsersModel = UsersModel
  }

  redirectIfNotLogged = (req, res, next) => {
    // redirect if not logged in
    if (typeof req.cookies.userhash === 'undefined') return res.redirect(process.env.BASE_URL + 'login')
    const userData = this.UsersModel.getByToken(req.cookies.userhash)
    if (!userData) {
      return res.redirect(process.env.BASE_URL + 'login')
    }
    // bind userData to res & sent to another middleware
    res.userData = userData
    next()
  }

  redirectIfLogged = (req, res, next) => {
    // redirect if logged in
    if (typeof req.cookies.userhash !== 'undefined') {
      const userData = this.UsersModel.getByToken(req.cookies.userhash)
      if (userData) {
        res.userData = userData
        return res.redirect('/')
      }
    }
    next()
  }

  verifyToken = (req, res, next) => {
    // send error 403 if anonymous tries to access the page
    if (typeof req.cookies.userhash === 'undefined') return res.json({ error_code: 403, error: 1, error_msg: 'Forbidden to access' })
    const userData = this.UsersModel.getByToken(req.cookies.userhash)
    if (!userData) {
      // send error json message if someone tries to access with wrong hash
      return res.json({ error: 1, error_msg: 'You don\'t have an authority to view this page' })
    }
    res.userData = userData
    next()
  }
}
export default new Auth({ UsersModel })
