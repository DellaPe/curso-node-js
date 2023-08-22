import { readFile } from 'node:fs/promises'
// Paralelo
Promise.all([
  readFile('./archivo1.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([firstText, secondText]) => {
  console.log(firstText)
  console.log(secondText)
})
