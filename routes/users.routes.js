import { Router } from 'express'
import userModel from './schemas/user.schemas.js'

const users = Router()

users.get('/', async (req, res) => {
  const users = await userModel.find({})

  return res.send(users)
})

users.get('/:id', async (req, res) => {
  const { id } = req.params

  const user = await userModel.findById(id)

  if (!user) return res.status(404).send()

  return res.send(user)
})

users.get('/company/:company', (req, res) => {
  const { company } = req.params

  const user = USERS_BBDD.find(user => user.company === company)

  if (!user) return res.status(404).send()

  return res.send(user)
})

users.get('/age/30', (req, res) => {
  const users = USERS_BBDD.map(user => {
    if (user.age < 30)
      return user
  })
  return res.send(users)
})

users.post('/', async (req, res) => {
  const { _id, index, guid, age, name, gender, company, email, phone} = req.body

  if (!name || !guid) return res.status(400).send()

  const user = await userModel.findById(guid).exec()

  if (user) return res.status(409).send()

  const newUser = new userModel({ _id, index, guid, age, name, gender, company, email, phone })

  await newUser.save()

  return res.send()
})

users.put('/:guid', (req, res) => {
  const { guid } = req.params
  const { age, name, gender, company, email, phone } = req.body

  const user = USERS_BBDD.find(user => user.guid === guid)

  if (!user) return res.status(404).send()

  user.name = name
  user.age = age
  user.gender = gender
  user.company = company
  user.email = email
  user.phone = phone
  
  return res.send(user)
})

users.delete('/:guid', (req, res) => {
  const { guid } = req.params

  const userIndex = USERS_BBDD.findIndex(user => user.guid === guid)

  if (userIndex === -1) return res.status(404).send()
  
  USERS_BBDD.splice(userIndex, 1)

  return res.send()
})

export default users