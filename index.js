import express from 'express';
import dotenv from 'dotenv'
import usersRouter from './routes/users.routes.js'
import { connect } from 'mongoose'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.text())

app.get('/', (req, res) => {
  res.send('Connected')
})

app.use('/users', usersRouter)

const bootstrp = async () => {
  connect(process.env.MONGODB_URL)

  app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
  })
}

bootstrp()