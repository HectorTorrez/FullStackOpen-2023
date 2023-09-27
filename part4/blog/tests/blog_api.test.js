const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialState)
})

test('GET/ blogs, verify if return in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /json/)
}, 100000)

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
