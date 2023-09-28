const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
    const newBlog = {
      title: 'Eat',
      author: 'Torrez',
      url: 'url.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialState.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('verify if the title or url are mising', async () => {
    const newBlog = {
      author: 'Torrez',
      likes: 400
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialState.length)
  })
  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogsToDelete.id}`)
      .expect(204)
  })
})

describe('adition a new note', () => {
  test('POST/ create a new blog post', async () => {
    const newBlog = {
      title: 'Eat mango',
      author: 'Hector',
      url: 'url.com',
      likes: 150
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialState.length + 1)
  })
})

describe('deleting one note', () => {
  test('success with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialState.length - 1)
    const author = blogs.map(b => b.author)
    expect(author).not.toContain(blogToDelete.author)
  })
})
