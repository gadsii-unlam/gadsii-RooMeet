export function CompletionScreen({ courseCount, roomCount, onRestart }: {
  courseCount: number
  roomCount: number
  onRestart: () => void
}) {
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
        <button type="button" className="button primary" onClick={onRestart}>Reiniciar prueba</button>
      </section>
    </main>
  )
}
