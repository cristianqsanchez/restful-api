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

users.get('/company/:company', async (req, res) => {
  const { company } = req.params

  const user = await userModel.find({company: company })

  if (!user) return res.status(404).send()

  return res.send(user)
})

users.get('/age/30', async (req, res) => {
  const users = await userModel.find({ age: { $lt: 30 } })
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

users.put('/:id', async (req, res) => {
  
  const { id } = req.params

  const { name, age, gender, company, email, phone } = req.body

  if (!name) return res.status(400).send();

  const user =  await userModel.findById(id)

  if (!user) return res.status(404).send()

  user.name = name
  user.age = age
  user.gender = gender
  user.company = company
  user.email = email
  user.phone = phone

  await user.save()

  return res.send(user)

})

users.delete('/:id', async (req, res) => {
  const { id } = req.params

    const user = await userModel.findById(id)
    
    if (!user) return res.status(404).send()

    await user.remove()

    return res.send()
})

export default users