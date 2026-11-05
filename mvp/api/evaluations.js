import { neon } from '@neondatabase/serverless'
import process from 'node:process'
import console from 'node:console'

const idPattern = /^session-[0-9a-f-]{36}$/i

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (!process.env.DATABASE_URL) return res.status(503).json({ error: 'La base de métricas no está configurada.' })
  const sql = neon(process.env.DATABASE_URL)
  try {
    if (req.method === 'GET') {
      if (!process.env.METRICS_ADMIN_KEY || req.headers.authorization !== `Bearer ${process.env.METRICS_ADMIN_KEY}`) return res.status(401).json({ error: 'Acceso denegado.' })
      const rows = await sql`SELECT id, started_at, finished_at, EXTRACT(EPOCH FROM (finished_at - started_at))::integer AS duration_seconds, changes, rating, comment, dataset_version FROM evaluation_sessions ORDER BY started_at DESC LIMIT 1000`
      return res.status(200).json({ rows })
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' })
    const { action, id } = req.body ?? {}
    if (typeof id !== 'string' || !idPattern.test(id)) return res.status(400).json({ error: 'Sesión inválida.' })
    if (action === 'start') {
      const version = req.body.datasetVersion
      if (typeof version !== 'string' || version.length > 80) return res.status(400).json({ error: 'Versión inválida.' })
      await sql`INSERT INTO evaluation_sessions (id, dataset_version) VALUES (${id}, ${version}) ON CONFLICT (id) DO NOTHING`
      return res.status(200).json({ ok: true })
    }
    if (action === 'finish') {
      const changes = req.body.changes
      if (!Number.isInteger(changes) || changes < 0 || changes > 10000) return res.status(400).json({ error: 'Cantidad de cambios inválida.' })
      const rows = await sql`UPDATE evaluation_sessions SET finished_at = COALESCE(finished_at, NOW()), changes = CASE WHEN finished_at IS NULL THEN ${changes} ELSE changes END WHERE id = ${id} RETURNING id`
      return res.status(rows.length ? 200 : 404).json({ ok: rows.length > 0 })
    }
    if (action === 'rate') {
      const { rating, comment } = req.body
      if (!Number.isInteger(rating) || rating < 1 || rating > 5 || typeof comment !== 'string' || comment.length > 500) return res.status(400).json({ error: 'Valoración inválida.' })
      const rows = await sql`UPDATE evaluation_sessions SET rating = ${rating}, comment = ${comment.trim()} WHERE id = ${id} AND finished_at IS NOT NULL RETURNING id`
      return res.status(rows.length ? 200 : 404).json({ ok: rows.length > 0 })
    }
    return res.status(400).json({ error: 'Acción desconocida.' })
  } catch (error) {
    console.error('Evaluation API error', error)
    return res.status(500).json({ error: 'No se pudieron procesar las métricas.' })
  }
}
