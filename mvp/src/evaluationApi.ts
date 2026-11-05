export interface EvaluationRow {
  id: string
  started_at: string
  finished_at: string | null
  duration_seconds: number | null
  changes: number
  rating: number | null
  comment: string | null
  dataset_version: string
}

export const localEvaluationMode = import.meta.env.DEV
const LOCAL_KEY = 'roomeet:mvp:evaluations:local:v1'

function localRows(): EvaluationRow[] {
  const parsed: unknown = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]')
  return Array.isArray(parsed) ? parsed as EvaluationRow[] : []
}

function saveLocal(rows: EvaluationRow[]): void {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
}

async function request(body: object): Promise<void> {
  const response = await fetch('/api/evaluations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`No se pudieron guardar las métricas (${response.status}).`)
}

export async function recordStart(id: string, datasetVersion: string, startedAt?: string | null): Promise<void> {
  if (localEvaluationMode) {
    const rows = localRows()
    if (!rows.some((row) => row.id === id)) {
      rows.unshift({ id, dataset_version: datasetVersion, started_at: startedAt ?? new Date().toISOString(), finished_at: null, duration_seconds: null, changes: 0, rating: null, comment: null })
      saveLocal(rows)
    }
    return
  }
  await request({ action: 'start', id, datasetVersion })
}

export async function recordFinish(id: string, changes: number, finishedAt?: string | null): Promise<void> {
  if (localEvaluationMode) {
    const rows = localRows()
    const row = rows.find((item) => item.id === id)
    if (!row) throw new Error('No se encontró la prueba local.')
    if (!row.finished_at) {
      row.finished_at = finishedAt ?? new Date().toISOString()
      row.duration_seconds = Math.max(0, Math.round((Date.parse(row.finished_at) - Date.parse(row.started_at)) / 1000))
      row.changes = changes
      saveLocal(rows)
    }
    return
  }
  await request({ action: 'finish', id, changes })
}

export async function recordRating(id: string, rating: number, comment: string): Promise<void> {
  if (localEvaluationMode) {
    const rows = localRows()
    const row = rows.find((item) => item.id === id && item.finished_at)
    if (!row) throw new Error('No se encontró la prueba local finalizada.')
    row.rating = rating
    row.comment = comment.trim()
    saveLocal(rows)
    return
  }
  await request({ action: 'rate', id, rating, comment })
}

export async function loadEvaluations(secret: string): Promise<EvaluationRow[]> {
  if (localEvaluationMode) return localRows()
  const response = await fetch('/api/evaluations', { headers: { Authorization: `Bearer ${secret}` }, cache: 'no-store' })
  if (!response.ok) throw new Error(response.status === 401 ? 'Clave incorrecta.' : 'No se pudieron cargar las métricas.')
  const result: { rows: EvaluationRow[] } = await response.json()
  return result.rows
}
