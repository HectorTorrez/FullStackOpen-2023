const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialState)
})

describe('whe there is initially some blogs saved', () => {
  test('GET/ blogs, verify if return in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
  }, 100000)
})

describe('viewing a specific note', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = await new User({ username: 'name', passwordHash }).save()
    const userForToken = { username: user.username, id: user._id }
    token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
      title: 'some blog',
      author: 'some author',
      url: 'https://www.example.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `hector ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })
  test('get id like a unique identifier', async () => {
    await api
      .get('/api/blogs')
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(b => b.id)
    for (const id of ids) {
      expect(id).toBeDefined()
    }
  })

  test('verify is the likes property is missing', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const newBlog = {
      title: 'Eat',
      author: 'Torrez',
      url: 'url.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `hector ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd[0].likes).toBe(0)
  })

  test('verify if the title or url are mising', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const newBlog = {
      author: 'Torrez Hector',
      likes: 450
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `hector ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogsToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogsToDelete.id}`)
      .set('Authorization', `hector ${token}`)
      .expect(204)
  })
})

describe('adition a new note', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = await new User({ username: 'name', passwordHash }).save()
    const userForToken = { username: user.username, id: user._id }
    return (token = jwt.sign(userForToken, process.env.SECRET))
  })
  test('POST/ create a new blog post', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const newBlog = {
      title: 'Eat mango',
      author: 'Hector',
      url: 'url.com',
      likes: 150
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `hector ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  })
})

describe('deleting one note', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = await new User({ username: 'name', passwordHash }).save()
    const userForToken = { username: user.username, id: user._id }
    token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
      title: 'some blog',
      author: 'some author',
      url: 'https://www.example.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `hector ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })
  test('success with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogsToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogsToDelete.id}`)
      .set('Authorization', `hector ${token}`)
      .expect(204)

    const blogs = await Blog.find({}).populate('user')
    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    const author = blogs.map(b => b.author)
    expect(author).not.toContain(blogsToDelete.author)
  })
})

describe('updating one note', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('1234', 10)
    const user = await new User({ username: 'name', passwordHash }).save()
    const userForToken = { username: user.username, id: user._id }
    token = jwt.sign(userForToken, process.env.SECRET)
    const newBlog = {
      title: 'some blog',
      author: 'some author',
      url: 'https://www.example.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `hector ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })
  test('success with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToUpdate = blogsAtStart[0]
    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `hector ${token}`)
      .send({ likes: 300 })
      .expect(200)
    const blogs = await helper.blogsInDb()
    const udaptedBlog = blogs[0]
    expect(blogs).toHaveLength(blogsAtStart.length)
    expect(udaptedBlog.likes).toBe(300)
  })
})
