const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const notesRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)
info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB')
  }).catch((e) => error('error connected to MongoDB', e.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', notesRouter)

module.exports = app
