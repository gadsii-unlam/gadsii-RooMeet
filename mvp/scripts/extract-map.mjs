import { mkdir, readFile, writeFile } from 'node:fs/promises'

const source = process.argv[2]
if (!source) throw new Error('Indicá la ruta al archivo TP3-wireframe-MVP.html como primer argumento.')
const html = await readFile(source, 'utf8')
const match = html.match(/data:image\/png;base64,([^'"\s]+)/)
if (!match) throw new Error('No se encontró el plano PNG embebido.')
await mkdir('public', { recursive: true })
await writeFile('public/mapa-campus.png', Buffer.from(match[1], 'base64'))
