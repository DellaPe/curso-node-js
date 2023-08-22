const fs = require('node:fs')
// Sincrono secuencial
console.log('Leer archivo 1')
const firstText = fs.readFileSync('./archivo1.txt', 'utf-8')

console.log(firstText)

console.log('Hacer cosas mientras lee el archivo 1 ...')
// si tenemos Sync vamos a tener que esperar a que termine de leer el archivo 1 para poder leer el archivo 2

console.log('Leer archivo 2')
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(secondText)
