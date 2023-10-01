const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { id: 1, author: 1, url: 1, title: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const findUserName = await User.find({ username })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (username.length < 3 || password.length < 3) {
    res.status(400).send({
      error: 'Minimun character limit not met',
      message: 'The request must containt a minimun of 3 characters.'
    }).end()
  } else if (findUserName.length > 0) {
    res.status(400).send({
      error: 'Username must be unique',
      message: 'The request must be unique'
    })
  } else {
    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }
})

module.exports = usersRouter
