const fs = require('node:fs')
// Asincrono callback
console.log('Leer archivo 1')
const firstText = fs.readFile('./archivo1.txt', 'utf-8', (err, text) => {
  console.log(text)
  console.log(err)
})

console.log(firstText)

console.log('Hacer cosas mientras lee el archivo 1 ...')

console.log('Leer archivo 2')
const secondText = fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log(text)
  console.log(err)
})

console.log(secondText)
