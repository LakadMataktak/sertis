import { db } from './../config/firestore.js'
import jwt from 'jsonwebtoken'
import md5 from 'md5'

class UsersModel {
  constructor (object) {
    const { jwt, db, md5 } = object
    this.jwt = jwt
    this.md5 = md5
    this.db = db
  }

  getByUsername = async (username) => { // get User Object by username
    if (typeof username === 'undefined') return false
    const usersRef = this.db.collection('users')
    const snapshot = await usersRef.where('username', '==', username).get()
    if (snapshot.empty) {
      return false
    }
    let user = {}
    snapshot.forEach((doc) => {
      user = doc.data()
    })
    return user
  }

  login = async (req) => { // get User Object by username & password
    if (typeof req.body.username === 'undefined') return false
    if (typeof req.body.password === 'undefined') return false
    const usersRef = this.db.collection('users')
    const snapshot = await usersRef.where('username', '==', req.body.username).where('password', '==', this.md5(req.body.password)).get()
    if (snapshot.empty) {
      return false
    }
    let user = {}
    snapshot.forEach((doc) => {
      user = doc.data()
    })
    return user
  }

  getByToken = async (token) => { // get User Object by token
    if (typeof token === 'undefined') return false
    const usersRef = this.db.collection('users')
    const snapshot = await usersRef.where('token', '==', token).get()
    if (snapshot.empty) {
      return false
    }
    let user = {}
    snapshot.forEach((doc) => {
      user = doc.data()
    })
    return user
  }

  add = async (req) => { // add User
    if (typeof req.body.username === 'undefined') return false
    if (typeof req.body.password === 'undefined') return false
    const username = req.body.username
    const password = this.md5(req.body.password)
    const user = {
      username: username,
      password: password
    }
    const token = jwt.sign({ user: user }, process.env.TOKEN_KEY)

    user.token = token
    const snapshot = this.db.collection('users')
    await snapshot.add(user)

    return token
  }
}
export default new UsersModel({ jwt, db, md5 })
