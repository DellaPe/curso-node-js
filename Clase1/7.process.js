// Devuelve informacion y control sobre el proceso actual de ejecución

// Devuelve los parametros que ingresa el usuario en la consola y mas
const argv = process.argv // [0]: node, [1]: fichero, ... [n]: archivos

// Current working directory: desde que carpeta se esta ejecutando el proceso
const cwd = process.cwd()

// salida
process.exit(0) // 0 = todo bien, 1 = error

// Escuchar los eventos cuando salga
process.on('exit', () => {
  // Limpiar los recursos
  console.log('El proceso va a terminar')
})

// Variable de entorno
const variable = process.env.NODE_ENV
