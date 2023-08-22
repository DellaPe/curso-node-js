const fs = require('node:fs/promises')

const { promisify } = require('node:util')
const readFilePromise = promisify(fs.readFile)
// readFilePromise: ejemplo de como utilizar promisify en modulos que no tengan promesas nativas
// para este caso estaria mal, ya que la tiene nativa

console.log('Leer archivo 1')
fs.readFile('./archivo1.txt', 'utf-8')
  .then(text => console.log(text))

console.log('Hacer cosas mientras lee el archivo 1 ...')

console.log('Leer archivo 2')
fs.readFilePromise('./archivo2.txt', 'utf-8')
  .then(text => console.log(text))
