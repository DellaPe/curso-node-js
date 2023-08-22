const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  // Lee el directorio
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log(pc.red(`Error al leer el directirio: ${folder}`))
    process.exit(1)
  }
  //
  const filePromise = files.map(async file => {
    const filePath = path.join(folder, file) // ruta del archivo
    let stats
    try {
      stats = await fs.stat(filePath) // indo del archivo
    } catch (error) {
      console.log(pc.red(`Error al leer el archivo: ${filePath}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f' // d: directorio, f: archivo
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${pc.blue(fileType)} ${pc.green(file.padEnd(40))} ${fileSize.padStart(10)} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filePromise)
  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
