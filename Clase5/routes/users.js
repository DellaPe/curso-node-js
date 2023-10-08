import { Router } from 'express'
import { UserController } from '../controllers/users'

export const createUserRouter = ({ usersModel }) => {
  const usersRouter = Router()

  usersRouter.post('/', UserController.create)

  return usersRouter
}
