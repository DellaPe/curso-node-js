const fs = require('node:fs')

// Lee el directorio
fs.readdir('./', (err, files) => {
  if (err) {
    console.log('Error al leer el directirio: ', err)
    return
  }

  files.forEach(file => {
    console.log(file)
  })
})
