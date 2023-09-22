require('dotenv').config()
const { info } = require('./utils/logger')
const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
  info(`Server running on por ${config.PORT}`)
})
