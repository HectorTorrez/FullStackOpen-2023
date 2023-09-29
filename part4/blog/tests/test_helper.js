const Blog = require('../models/blog')
const User = require('../models/user')

const initialState = [
  {
    title: 'Eat fruits',
    author: 'Hector',
    url: 'url.com',
    likes: 100
  },
  {
    title: 'Eat meat',
    author: 'Antonio',
    url: 'url.com',
    likes: 50
  },
  {
    title: 'Eat meat',
    author: 'Pirata',
    url: 'url.com',
    likes: 50
  }
]

const nonExistindId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialState,
  nonExistindId,
  blogsInDb,
  usersInDb
}
