const http = require('node:http')
const pikachuJSON = require('./pokemon/pikachu.json') // Por ser CJS puedo hacerlo

const PORT = 1234

const METHOD = {
  GET: 'GET',
  POST: 'POST'
}

const URL_GET = {
  HOME: '/',
  PIKACHU: '/pokemon/pikachu'
}

const URL_POST = {
  POKEMON: '/pokemon'
}

const HEADER = {
  CONTENT_TYPE: 'Content-Type',
  TEXT_HTML: 'text/html; charset=utf-8',
  APPLICATION_JSON: 'application/json; charset=utf-8'
}

const processRequest = (req, res) => {
  const { method, url } = req
  console.log({ url })
  switch (method) {
    case METHOD.GET:
      switch (url) {
        case URL_GET.HOME:
          res.setHeader(HEADER.CONTENT_TYPE, HEADER.TEXT_HTML)
          return res.end('<h1>Bienvenido a mi página de inicio!</h1>')
        case URL_GET.PIKACHU:
          res.setHeader(HEADER.CONTENT_TYPE, HEADER.APPLICATION_JSON)
          return res.end(JSON.stringify(pikachuJSON))
        default:
          res.statusCode = 404
          res.setHeader(HEADER.CONTENT_TYPE, HEADER.TEXT_HTML)
          return res.end('<h1>Página no encontrada: 404<h1>')
      }

    case METHOD.POST:
      switch (url) {
        case URL_POST.POKEMON: { // las consntantes son en el scope del bloque
          let body = ''
          req.on('data', chunk => { body += chunk.toString() })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': HEADER.APPLICATION_JSON })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader(HEADER.CONTENT_TYPE, HEADER.TEXT_HTML)
          return res.end('<h1>Página no encontrada: 404<h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
