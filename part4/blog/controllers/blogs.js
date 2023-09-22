const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

notesRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => res.json(blogs)).catch(e => error(e))
})

notesRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => {
    res.status(201).json(result)
  }).catch(e => error(e))
})

module.exports = notesRouter
