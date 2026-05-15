const express = require('express')
const cors = require('cors')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const router = require('./routes')
const db = require('./config/db')

const app = express()

app.use(express.json())
app.use(cors())

db.connection
  .once('open', () => {
    console.log('db connected')
  })
  .on('error', () => {
    console.log('error in connecting db', err)
  })

app.get('/favico.ico', (req, res) => {
  res.sendStatus(404)
})

// ROUTE
app.use('/api/v1', router)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404)
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))
