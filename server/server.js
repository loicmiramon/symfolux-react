require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const routing = require('./routes/index')
const cors = require('cors')

// Middleware
app.use(express.json())
app.use('/', routing)
app.use(cookieParser())
app.use(cors())
app.use(express.static('../client/build'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

// Init Server
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`)
})