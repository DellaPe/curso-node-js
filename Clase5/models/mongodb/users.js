import { mongoose } from 'mongoose'
import { randomUUID } from 'node:crypto'

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean
})

const UserModelDB = mongoose.model('User', userSchema)

export class UsersModel {
  static async create ({ user }) {
    try {
      const { hasError, error } = await UsersModel.validateUser({ user })
      if (hasError) return { hasError, error }
      const newUser = new UserModelDB({ _id: randomUUID(), ...user })
      await newUser.save()
      return { hasError: false, newUser }
    } catch (error) {
      return { hasError: true, error: 'Error creating user' }
    }
  }

  // Validaciones
  static async validateUser ({ user }) {
    try {
      const users = await UserModelDB.find().exec()
      // validaciones
      const emailExists = users.find(({ email }) => email === user.email)
      if (emailExists) return { hasError: true, error: 'Email already exists' }

      const nameExists = users.find(({ name }) => name === user.name)
      if (nameExists) return { hasError: true, error: 'Name already exists' }

      return { hasError: false }
    } catch (error) {
      return { hasError: true, error: 'Error validating user' }
    }
  }
}
