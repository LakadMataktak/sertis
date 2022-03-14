import CardsModel from './../models/cards.model.js'
const AjaxHome = {
  /**
     * /home/ajax/getCards.
     * @param {Object} params inherited from express.
     * @return {Object} of the express.
     */
  AjaxGetCards: async function (req, res) {
    // render the /home/ajax/getCards view
    if (!await res.userData) {
      res.redirect(process.env.BASE_URL + 'login')
      return
    }
    const userData = await res.userData
    const cards = await CardsModel.getAll()
    if (cards.length > 0) {
      cards.forEach((each) => {
        (each.user_id === userData.token) ? each.owner = 1 : each.owner = 0
      })
      return res.json({ success: 1, success_msg: 'Successfully got the cards', posts: cards })
    }
    return res.json({ error: 1, error_msg: 'There are no cards right now.' })
  },
  /**
     * /home/ajax/submitCard.
     * @param {Object} params inherited from express.
     * @return {Object} of the express.
     */
  AjaxSubmitCard: async function (req, res) {
    // render the /home/ajax/submitCard view

    if (typeof req.body.name === 'undefined' || req.body.name.trim() === '') return res.json({ error: 1, error_msg: 'name can\'t be empty' })
    if (typeof req.body.category === 'undefined' || req.body.category.trim() === '') return res.json({ error: 1, error_msg: 'category can\'t be empty' })
    if (typeof req.body.content === 'undefined' || req.body.content.trim() === '') return res.json({ error: 1, error_msg: 'content can\'t be empty' })
    const userData = await res.userData
    const card = await CardsModel.add({ user_id: userData.token, author: userData.username }, req)
    card.owner = 1
    const category = CardsModel.getCategoryByid(req.body.category)
    if (category) {
      card.categoryString = category.title
      return res.json({ success: 1, success_msg: 'Successfully added a card', post: card })
    }
    return res.json({ error: 1, error_msg: 'Something went wrong while adding a post' })
  },
  /**
     * /home/ajax/editCard.
     * @param {Object} params inherited from express.
     * @return {Object} of the express.
     */
  AjaxeditCard: async function (req, res, next) {
    // render the /home/ajax/editCard view
    if (typeof req.body.doc_id === 'undefined' || req.body.doc_id.trim() === '') return res.json({ error: 1, error_msg: 'doc_id can\'t be empty' })
    if (typeof req.body.name === 'undefined' || req.body.name.trim() === '') return res.json({ error: 1, error_msg: 'name can\'t be empty' })
    if (typeof req.body.category === 'undefined' || req.body.category.trim() === '') return res.json({ error: 1, error_msg: 'category can\'t be empty' })
    if (typeof req.body.content === 'undefined' || req.body.content.trim() === '') return res.json({ error: 1, error_msg: 'content can\'t be empty' })

    const userData = await res.userData
    const result = await CardsModel.edit({ user_id: userData.token, author: userData.username }, req)
    if (result) {
      return res.json({ success: 1, success_msg: 'Successfully edited the card' })
    }
    return res.json({ error: 1, error_msg: 'Something went wrong while editing a post' })
  },
  /**
     * /home/ajax/deleteCard.
     * @param {Object} params inherited from express.
     * @return {Object} of the express.
     */
  AjaxdeleteCard: async function (req, res, next) {
    // render the /home/ajax/deleteCard view
    if (typeof req.body.doc_id === 'undefined' || req.body.doc_id.trim() === '') return res.json({ error: 1, error_msg: 'doc_id can\'t be empty' })
    const userData = await res.userData
    const result = await CardsModel.delete({ user_id: userData.token }, req)
    if (result) {
      return res.json({ success: 1, success_msg: 'Successfully deleted the card' })
    }
    return res.json({ error: 1, error_msg: 'Something went wrong while deleting the post' })
  }
}
export default AjaxHome
