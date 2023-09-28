const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

notesRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const blog = new Blog(body)
  if (body.title === undefined || body.url === undefined) {
    res.status(400).end()
  } else {
    const response = await blog.save()
    res.status(201).json(response)
  }
})

notesRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (e) {
    error(e)
  }
})

notesRouter.patch('/:id', async (req, res) => {
  try {
    const body = req.body
    const id = req.params.id
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const blog = await Blog.findByIdAndUpdate(id, newBlog)
    res.json(blog).status(200)
  } catch (e) {
    error(e)
    res.status(400)
  }
})

module.exports = notesRouter
