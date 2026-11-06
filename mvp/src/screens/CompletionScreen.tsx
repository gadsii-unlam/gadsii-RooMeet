import { useState } from 'react'

export function CompletionScreen({ courseCount, roomCount, onRestart, onRate, ratingSaved }: {
  courseCount: number
  roomCount: number
  onRestart: () => void
  onRate?: (rating: number, comment: string) => Promise<void>
  ratingSaved?: boolean
}) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!onRate || rating < 1 || sending) return
    setSending(true)
    setError('')
    try { await onRate(rating, comment) }
    catch { setError('No se pudo enviar la valoración. Podés volver a intentar.') }
    finally { setSending(false) }
  }

  return (
    <main id="main-content" className="page-shell completion-page">
      <section className="panel completion-card" aria-labelledby="completion-title">
        <div className="completion-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">Proceso finalizado</p>
        <h1 id="completion-title">Asignación guardada exitosamente</h1>
        <p className="completion-lead">La asignación completa de {courseCount} cursos en {roomCount} aulas fue guardada y enviada al SIU Guaraní.</p>
        <aside className="mock-notice">
          <strong>Simulación del MVP</strong>
          <p>Este resultado es un mock para probar el flujo. No se guardaron datos institucionales ni se realizó un envío real al SIU Guaraní.</p>
        </aside>
        {onRate && <div className="rating-panel">
          <h2>¿Cómo valorarías la experiencia?</h2>
          {ratingSaved ? <p role="status">Gracias, tu valoración quedó registrada.</p> : <>
            <div className="rating-options" role="group" aria-label="Valoración de 1 a 5">
              {[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" className={`button ${rating === value ? 'primary' : ''}`} aria-pressed={rating === value} onClick={() => setRating(value)}>{value}</button>)}
            </div>
            <label htmlFor="rating-comment">Comentario opcional</label>
            <textarea id="rating-comment" data-clarity-mask="True" value={comment} maxLength={500} onChange={(event) => setComment(event.target.value)} placeholder="¿Qué te resultó fácil o difícil?" />
            {error && <p role="alert">{error}</p>}
            <button type="button" className="button primary" disabled={rating < 1 || sending} onClick={submit}>{sending ? 'Enviando…' : 'Enviar valoración'}</button>
          </>}
        </div>}
        <button type="button" className="button primary" onClick={onRestart}>Reiniciar prueba</button>
      </section>
    </main>
  )
}
