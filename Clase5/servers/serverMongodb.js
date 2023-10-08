import 'dotenv/config'
import { createApp } from '../app.js'
import mongoose from 'mongoose'
// Models
import { MovieModel } from '../models/mongodb/movie.js'
import { UsersModel } from '../models/mongodb/users.js'

const connectionAndCreateApp = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL)
  createApp({ movieModel: MovieModel, usersModel: UsersModel })
}

connectionAndCreateApp()
