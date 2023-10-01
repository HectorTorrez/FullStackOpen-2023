const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')

notesRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('hector ')) {
    return authorization.replace('hector ', '')
  }
  return null
}

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
