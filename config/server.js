import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000
dotenv.config()
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
export {
  express, app
}
