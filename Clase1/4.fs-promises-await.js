const { readFile } = require('node:fs/promises')
// Asincrono secuencial
// IIFE: Immediately Invoked Function Expression
;(
  async () => {
    console.log('Leer archivo 1')
    const firstText = await readFile('./archivo1.txt', 'utf-8')
    console.log(firstText)

    console.log('Hacer cosas mientras lee el archivo 1 ...')

    console.log('Leer archivo 2')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log(secondText)
  }
)()
