const net = require('node:net') // es un modo mas rapido, con menos cabeceras para verificar el puerto

function findAvailablePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code !== 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
        return
      }
      reject(err)
    })
  })
}

module.exports = { findAvailablePort }
