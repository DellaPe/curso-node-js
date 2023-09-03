const http = require('node:http')
const fs = require('node:fs')

const PORT = 3000

const processRequest = (req, res) => {
  const { url } = req
  // Le decimos el tipo de contenido que vamos a devolver y la codificación
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  // Si todo va bien por defecto el código de estado es 200
  if (url === '/') {
    res.end('Bienvenido a mi página de inicio!')
    return
    // res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // res.end('<h1>Bienvenido a mi página de inicio!</h1>')
  }
  if (url === '/contacto') {
    res.end('Contacto')
    return
  }
  if (url === '/imagen') {
    fs.readFile('./cat.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Error interno')
      }
      res.setHeader('Content-Type', 'image/jpg')
      res.end(data)
    })
    return
  }

  res.statusCode = 404
  res.end('Página no encontrada: 404')
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
