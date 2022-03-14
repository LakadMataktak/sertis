import { db, Timestamp } from './../config/firestore.js'
class CardsModel {
  constructor (object) {
    const { db } = object
    this.db = db
  }

  add = async (userObject, req) => { // add card to firestore db
    if (typeof req.body.name === 'undefined') return false
    if (typeof req.body.category === 'undefined') return false
    if (typeof req.body.content === 'undefined') return false

    const card = {
      ...userObject,
      name: req.body.name.trim(),
      status: 0,
      category: req.body.category.trim(),
      content: req.body.content.trim(),
      created: Timestamp.fromDate(new Date())
    }
    const cardsRef = this.db.collection('cards')
    if (await cardsRef.add(card)) {
      return card
    }
    return false
  }

  getAll = async () => { // get all cards from firestore db
    const cardsRef = this.db.collection('cards')
    const snapshot = await cardsRef.where('status', '==', 0).orderBy('created', 'desc').get()
    if (snapshot.empty) {
      return false
    }
    const cards = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      const category = this.getCategoryByid(data.category)
      data.doc_id = doc.id
      data.categoryString = category.title
      cards.push(data)
    })
    return cards
  }

  edit = async (userObject, req) => { // edit card from firestore db
    if (typeof req.body.doc_id === 'undefined') return false
    if (typeof req.body.name === 'undefined') return false
    if (typeof req.body.category === 'undefined') return false
    if (typeof req.body.content === 'undefined') return false

    const cardsRef = this.db.collection('cards')
    const snapshot = await cardsRef.doc(req.body.doc_id)
    const doc = await snapshot.get()
    const row = doc.data()
    if (row.user_id !== userObject.user_id) {
      // reject if the requested source is not owner
      return false
    }

    const card = {
      ...userObject,
      name: req.body.name.trim(),
      status: 0,
      category: req.body.category.trim(),
      content: req.body.content.trim(),
      created: Timestamp.fromDate(new Date())
    }
    if (await snapshot.update(card)) { // update data to collection
      return card
    }
    return false
  }

  delete = async (userData, req) => { // update the status of the card from firestore db
    if (typeof req.body.doc_id === 'undefined') return false
    const cardsRef = this.db.collection('cards')
    const snapshot = await cardsRef.doc(req.body.doc_id).get()
    if (snapshot.empty) {
      return false
    }

    const row = snapshot.data()
    if (row.user_id !== userData.user_id) {
      // reject if the requested source is not owner
      return false
    }

    return cardsRef.doc(snapshot.id).update({ status: 1 }) // update data to collection
  }

  getCategories = () => {
    return [{
      id: 1,
      title: 'Biology'
    }, {
      id: 2,
      title: 'Finance'
    }, {
      id: 3,
      title: 'Chemistry'
    }, {
      id: 4,
      title: 'Engineering'
    }, {
      id: 5,
      title: 'Health'
    }, {
      id: 6,
      title: 'Society & Social'
    }, {
      id: 7,
      title: 'Art'
    }]
  }

  getCategoryByid = (id) => { // return the single category if matched id
    const category = (this.getCategories()).filter(function (obj) {
      return obj.id == id
    })
    if (category) return category.shift()
    return false
  }
}
export default new CardsModel({ db })
