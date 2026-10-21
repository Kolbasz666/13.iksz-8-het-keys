require('dotenv').config({quiet: true})
const express = require('express')
const cors = require('cors')
const key = require('./router/key')
const user = require('./router/user')

const PORT = process.env.PORT
const server = express()

server.use(cors())
server.use(express.json())
server.use(key)
server.use(user)

server.listen(PORT, () => console.log(`A szerver fut a következő porton: ${PORT}`))