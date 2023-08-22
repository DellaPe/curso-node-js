const os = require('node:os')
const FACTOR_MEMORY = 1 / 1024 / 1024 // <== 1 MB
const FACTOR_TIME = 1 / 60 / 60 // <== 1 hora

console.log('Informacion del sistema operativo:')
console.log('-----------------------------------')

console.log('Nombre del SO: ', os.platform())
console.log('Version del SO: ', os.release())
console.log('Arquitectura: ', os.arch())
console.log('CPUs: ', os.cpus()) // <== vamos a poder escalar procesos en Node
console.log('Memoria total: ', os.totalmem() * FACTOR_MEMORY)
console.log('Memoria libre: ', os.freemem() * FACTOR_MEMORY)
console.log('Tiempo activo: ', os.uptime() * FACTOR_TIME)
