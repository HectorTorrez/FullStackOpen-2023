const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

notesRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

notesRouter.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body)
    const response = await blog.save()
    res.status(201).json(response)
  } catch (e) {
    error(e)
  }
})

module.exports = notesRouter
