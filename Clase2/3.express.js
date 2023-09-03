const express = require('express')
const pikachuJSON = require('./pokemon/pikachu.json')

const app = express() // Creamos la app

app.disable('x-powered-by') // Deshabilitamos el header X-Powered-By (Es buena practica de seguridad por versiones / bits)

const PORT = process.env.PORT || 1234

const URL_GET = {
  HOME: '/',
  PIKACHU: '/pokemon/pikachu'
}

const METHOD = {
  GET: 'GET',
  POST: 'POST'
}

const URL_POST = {
  POKEMON: '/pokemon'
}

const HEADER = {
  CONTENT_TYPE: 'content-type',
  APPLICATION_JSON: 'application/json'
}

// Middleware
app.use((req, res, next) => {
  console.log('Middleware 1')
  if (req.method !== METHOD.POST) return next()
  if (req.headers[HEADER.CONTENT_TYPE] !== HEADER.APPLICATION_JSON) return next()
  // Solo llegan post con content-type application/json
  // Mutamos el request para que tenga el body parseado
  let body = ''
  req.on('data', chunk => { body += chunk.toString() })
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})

// Middleware igual al anterior pero con express
// app.use(express.json())

app.get(URL_GET.HOME, (req, res) => {
  // Recordar que por defecto es 200
  // res.json({ message: 'Home' })
  res.send('<h1>Home</h1>') // Detecta el Content-Type
})

app.get(URL_GET.PIKACHU, (req, res) => {
  res.json(pikachuJSON)
})

app.post(URL_POST.POKEMON, (req, res) => {
  // req.body es el body parseado por el middleware
  // Aca tendriamos el guardado en la base de datos
  res.status(201).json(req.body)
})
// Formara global de request para manejar errores
app.use((req, res) => {
  res.status(404).send('<h1>Página no encontrada: 404<h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
