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
  const contents = blogsAtEnd.map(b => b.id)
  expect(contents).toBeDefined()
})
