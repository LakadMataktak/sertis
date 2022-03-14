import { app, routes } from './routes.js'
import nunjucks from 'nunjucks'
import CardsModel from './models/cards.model.js'
routes.init() // initialize routes
const env = nunjucks.configure('views', { autoscape: true, express: app, watch: true })
env.addGlobal('Categories', CardsModel.getCategories())
