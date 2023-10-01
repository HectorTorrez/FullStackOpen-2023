const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { info, error } = require('./utils/logger')
const config = require('./utils/config')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB')
  }).catch((e) => error('error connected to MongoDB', e.message))

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
module.exports = app
