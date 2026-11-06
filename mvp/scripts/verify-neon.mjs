import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { createServer } from 'node:http'
import process from 'node:process'
import { neon } from '@neondatabase/serverless'
import handler from '../api/evaluations.js'

const envFile = existsSync('.env') ? '.env' : '.env.local'
if (existsSync(envFile)) process.loadEnvFile(envFile)
assert.ok(process.env.DATABASE_URL, 'Falta DATABASE_URL')

const sql = neon(process.env.DATABASE_URL)
const id = `session-${randomUUID()}`
process.env.METRICS_ADMIN_KEY ||= randomUUID()

const server = createServer(async (req, res) => {
  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    req.body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : undefined
    res.status = (code) => { res.statusCode = code; return res }
    res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); return res }
    await handler(req, res)
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ error: String(error) }))
  }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const baseUrl = `http://127.0.0.1:${server.address().port}`

async function call(method, body, authorization) {
  const response = await fetch(`${baseUrl}/api/evaluations`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return { statusCode: response.status, body: await response.json() }
}

try {
  assert.equal((await call('POST', { action: 'start', id, datasetVersion: 'neon-smoke-test' })).statusCode, 200)
  assert.equal((await call('POST', { action: 'finish', id, changes: 2 })).statusCode, 200)
  assert.equal((await call('POST', { action: 'rate', id, rating: 4, comment: 'Prueba técnica' })).statusCode, 200)
  assert.equal((await call('GET')).statusCode, 401)
  const result = await call('GET', null, `Bearer ${process.env.METRICS_ADMIN_KEY}`)
  assert.equal(result.statusCode, 200)
  const row = result.body.rows.find((item) => item.id === id)
  assert.ok(row, 'La sesión no apareció en la consulta')
  assert.equal(row.changes, 2)
  assert.equal(row.rating, 4)
  assert.ok(row.duration_seconds >= 0)
  console.log('Neon API: start, finish, rate, GET autorizado y control de acceso OK.')
} finally {
  await sql`DELETE FROM evaluation_sessions WHERE id = ${id}`
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  console.log('Sesión de prueba eliminada.')
}
