require('dotenv-safe').load()
const express = require('express')
const http = require('http')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const socketIO = require('socket.io')

const app = express()
let server = http.createServer(app)

process.on('uncaughtException', err =>
  console.error('uncaught exception: ', err))
process.on('unhandledRejection', (reason, p) =>
  console.error('unhandled rejection: ', reason, p))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger(process.env.LOG_ENV))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(express.static(path.join(__dirname, '/../public'))) // public folder!
app.use(cookieParser())

// Routes
app.get('/', (req, res) =>  {
  res.send('Hello World!') 
})

// Server
const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || 'localhost'

server.listen(port, () => {
  console.log(`Listening on ${host}:${port}`)
})

module.exports = app
