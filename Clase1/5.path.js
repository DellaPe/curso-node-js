const path = require('node:path')

// union de rutas con path.join
const filePath = path.join('Clase1', '5.path.js')
console.log(filePath)

// nombre del fichero
const base = path.basename(filePath)
console.log(base)

const base2 = path.basename(filePath, '.js')
console.log(base2)

// extension del fichero
const ext = path.extname(filePath)
console.log(ext)
