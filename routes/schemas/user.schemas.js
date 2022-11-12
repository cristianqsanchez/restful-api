import { model, Schema } from 'mongoose'

const userSchema = Schema({
  _id: String,
  index: Number,
  guid: String,
  age: Number,
  name: String,
  gender: String,
  company: String,
  email: String,
  phone: String
})

const userModel = model('User', userSchema)

export default userModel