import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { HOME, RESOURCES } from './constants.js'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/users.js'

export const createApp = ({ movieModel, usersModel }) => {
  const app = express()

  app.use(json()) // Middleware para parsear el body de las peticiones
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.get(HOME, (req, res) => { res.send('Hola! Esta es la API de películas.') })

  app.use(RESOURCES.USERS, createUserRouter({ usersModel }))
  app.use(RESOURCES.MOVIES, createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234 // Es necesario para el deploy

  app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`) })
}
