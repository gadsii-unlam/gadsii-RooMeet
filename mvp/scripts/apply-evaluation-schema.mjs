import { existsSync, readFileSync } from 'node:fs'
import process from 'node:process'
import { neon } from '@neondatabase/serverless'

const envFile = existsSync('.env') ? '.env' : '.env.local'
if (existsSync(envFile)) process.loadEnvFile(envFile)

const connectionString = process.env.DATABASE_URL_UNPOOLED
if (!connectionString) {
  console.error('Falta DATABASE_URL_UNPOOLED. Ejecutá neon deploy para descargar las variables de Neon.')
  process.exit(1)
}

const sql = neon(connectionString)
const statements = readFileSync(new URL('../docs/evaluation-schema.sql', import.meta.url), 'utf8')
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean)

for (const statement of statements) await sql.query(statement)
console.log(`Esquema de evaluación aplicado (${statements.length} sentencias).`)
