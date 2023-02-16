require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const routing = require('./routes/index')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}



// Middleware
app.use(express.json())
app.use('/', routing)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.static('../client/build'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

// Init Server
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`)
})