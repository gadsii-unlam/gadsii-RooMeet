import { useState } from 'react'
import { loadEvaluations, localEvaluationMode, type EvaluationRow } from '../evaluationApi'

function csvCell(value: unknown): string {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function formatDuration(seconds: number | null): string {
  if (seconds === null) return '—'
  const totalSeconds = Math.max(0, Math.round(seconds))
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`
}

export function MetricsScreen({ onBack }: { onBack: () => void }) {
  const [secret, setSecret] = useState('')
  const [rows, setRows] = useState<EvaluationRow[] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const completed = rows?.filter((row) => row.finished_at) ?? []
  const durations = completed.map((row) => row.duration_seconds).filter((value): value is number => value !== null).sort((a, b) => a - b)
  const median = durations.length ? (durations[Math.floor((durations.length - 1) / 2)] + durations[Math.floor(durations.length / 2)]) / 2 : null
  const rated = completed.filter((row) => row.rating !== null)
  const averageRating = rated.length ? rated.reduce((sum, row) => sum + (row.rating ?? 0), 0) / rated.length : null

  const refresh = async () => {
    setLoading(true)
    setError('')
    try { setRows(await loadEvaluations(secret)) }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Error al cargar.'); setRows(null) }
    finally { setLoading(false) }
  }

  const exportCsv = () => {
    if (!rows) return
    const fields: (keyof EvaluationRow)[] = ['id', 'started_at', 'finished_at', 'duration_seconds', 'changes', 'rating', 'comment', 'dataset_version']
    const csv = [fields.join(','), ...rows.map((row) => fields.map((field) => csvCell(row[field])).join(','))].join('\r\n')
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'roomeet-evaluaciones.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return <main id="main-content" className="page-shell" data-clarity-mask="True">
    <button className="button" onClick={onBack}>← Volver al MVP</button>
    <h1>Resultados de las pruebas</h1>
    <p>{localEvaluationMode ? 'Pruebas guardadas en este navegador para desarrollo local.' : 'Sesiones anónimas registradas en la base de datos del piloto.'}</p>
    <section className="panel metrics-access">
      {!localEvaluationMode && <><label htmlFor="metrics-key">Clave de consulta</label><input id="metrics-key" type="password" value={secret} onChange={(event) => setSecret(event.target.value)} autoComplete="off" /></>}
      <button className="button primary" disabled={(!localEvaluationMode && !secret) || loading} onClick={refresh}>{loading ? 'Cargando…' : 'Consultar'}</button>
      {error && <p role="alert">{error}</p>}
    </section>
    {rows && <section className="panel metrics-results">
      <div className="metrics-overview">
        <div><strong>{rows.length}</strong><span>pruebas iniciadas</span></div>
        <div><strong>{completed.length}</strong><span>completadas ({rows.length ? Math.round(completed.length / rows.length * 100) : 0}%)</span></div>
        <div><strong>{formatDuration(median)}</strong><span>tiempo mediano (mm:ss)</span></div>
        <div><strong>{averageRating === null ? '—' : averageRating.toFixed(1)}</strong><span>valoración media / 5</span></div>
      </div>
      <p>Las sesiones sin finalización se muestran como incompletas; una pestaña abierta también puede figurar así.</p>
      <button className="button" onClick={exportCsv}>Exportar CSV</button>
      <div className="table-scroll"><table><thead><tr><th>Inicio</th><th>Estado</th><th>Duración</th><th>Cambios</th><th>Valoración</th><th>Comentario</th></tr></thead><tbody>
        {rows.map((row) => <tr key={row.id}><td>{new Date(row.started_at).toLocaleString('es-AR')}</td><td>{row.finished_at ? 'Completada' : 'Incompleta'}</td><td>{formatDuration(row.duration_seconds)}</td><td>{row.changes}</td><td>{row.rating ?? '—'}</td><td>{row.comment ?? '—'}</td></tr>)}
      </tbody></table></div>
    </section>}
  </main>
}
