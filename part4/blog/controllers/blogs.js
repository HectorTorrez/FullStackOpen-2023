const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const token = req.token
  const user = req.user

  if (!token) {
    return res.status(401).json({ error: 'token mising or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes
  })
  if (body.title === undefined || body.url === undefined) {
    res.status(400).end()
  } else {
    const response = await blog.save()
    user.blogs = user.blogs.concat(response._id)
    await user.save()
    res.status(201).json(response)
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  try {
    const token = req.token
    const user = req.user
    const id = req.params.id
    if (!token) {
      return res.status(401).json({ error: 'token invalid or mising' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!(token && decodedToken.id)) {
      return res.status(401).json({ error: 'token invalid or missing' })
    }
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid Object id format' })
    }
    const blog = await Blog.findOne({ _id: id })
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(id)
      res.status(204).end()
    } else {
      res.status(401).json({ error: 'unauthorized operation' })
    }
  } catch (e) {
    error(e)
  }
})

blogsRouter.patch('/:id', async (req, res) => {
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

module.exports = blogsRouter
