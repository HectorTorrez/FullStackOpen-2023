const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

describe('when there is initially one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('antonio', 10)
    const user = new User({ username: 'antonio', name: 'antonio', passwordHash })

    await user.save()
  })

  test('creating succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'hector',
      username: 'hector',
      password: 'hector'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('valid users', () => {
  test('the name and password must containt a min of 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'antonio',
      username: 'an',
      password: 'an'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('the username must be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = ({
      name: 'antonio',
      username: 'antonio',
      password: 'antonio12324'
    })

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('Username must be unique')
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})
