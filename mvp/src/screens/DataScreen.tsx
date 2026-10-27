import { useState } from 'react'
import { careers, formatCourseSchedule, getCareer, sharedCareerCount } from '../data/demoDataset'
import type { Course, Phase, Room, Term } from '../domain/types'

export function DataScreen({ rooms, courses, phase, planningTerm, onPlanningTermChange, onGenerate, onContinue }: { rooms: Room[]; courses: Course[]; phase: Phase; planningTerm: Term; onPlanningTermChange: (term: Term) => void; onGenerate: () => void; onContinue: () => void }) {
  const [careerFilter, setCareerFilter] = useState('all')
  const visibleCourses = courses.filter((course) => careerFilter === 'all' || course.careerId === careerFilter)
  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Paso 1 · Datos preparados</p>
        <h1>Revisá la entrada de la prueba</h1>
        <p>Planificación del {planningTerm}.º cuatrimestre para las seis carreras de grado del DIIT. Materias, códigos y horas provienen de planes oficiales; horarios, aulas, cupos e inscriptos son datos de prueba sin conexión con SIU Guaraní. En Civil, también es simulada la distribución por cuatrimestre.</p>
      </header>

      <section className="panel planning-period" aria-labelledby="planning-period-title">
        <div><h2 id="planning-period-title">Período a planificar</h2><p>Cada propuesta corresponde a un solo cuatrimestre.</p></div>
        <label className="filter-control">Cuatrimestre<select value={planningTerm} disabled={phase !== 'not-started'} onChange={(event) => onPlanningTermChange(Number(event.target.value) as Term)}><option value={1}>1.º cuatrimestre</option><option value={2}>2.º cuatrimestre</option></select></label>
      </section>

      <section className="summary-strip" aria-label="Resumen del conjunto de prueba">
        <div><strong>{careers.length}</strong><span>Carreras de grado</span></div>
        <div><strong>{courses.length}</strong><span>Cursos</span></div>
        <div><strong>{rooms.length}</strong><span>Aulas de prueba</span></div>
        <div><strong>0</strong><span>Asignaciones iniciales</span></div>
      </section>

      <div className="data-grid">
        <section className="panel">
          <div className="section-title"><div><h2>Aulas disponibles</h2><p>Capacidad máxima declarada</p></div></div>
          <div className="room-cards">
            {rooms.map((room) => <article className="room-card" key={room.id}><span>{room.name}</span><strong>{room.capacity}</strong><small>lugares</small></article>)}
          </div>
        </section>

        <section className="panel span-two">
          <div className="section-title"><div><h2>Materias del {planningTerm}.º cuatrimestre</h2><p>Un curso simulado por materia y carrera; {visibleCourses.length} de {courses.length} visibles</p></div></div>
          <div className="filter-row">
            <label className="filter-control">Carrera<select value={careerFilter} onChange={(event) => setCareerFilter(event.target.value)}><option value="all">Todas las carreras</option>{careers.map((career) => <option key={career.id} value={career.id}>{career.name}</option>)}</select></label>
          </div>
          {careerFilter !== 'all' && <p className="source-note">Plan {getCareer(careerFilter)?.plan}: <a href={getCareer(careerFilter)?.sourceUrl} target="_blank" rel="noopener noreferrer">consultar materias en el DIIT ↗</a></p>}
          <div className="table-wrap">
            <table>
              <thead><tr><th>Carrera</th><th>Código y materia</th><th>Horas sem.</th><th>Horario de prueba</th><th>Cupo</th><th>Historial</th></tr></thead>
              <tbody>{visibleCourses.map((course) => <tr key={course.id}><td>{getCareer(course.careerId)?.name}</td><td><strong>{course.curriculumCode} · {course.subject}</strong>{sharedCareerCount(course) > 1 && <small className="shared-label">Materia presente en {sharedCareerCount(course)} planes</small>}</td><td>{course.weeklyHours}</td><td>{formatCourseSchedule(course)}</td><td>{course.estimatedSeats}</td><td>{course.enrollmentHistory.join(' · ')}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="callout info"><strong>Qué se va a comprobar</strong><p>El motor buscará una asignación sin superposiciones y con capacidad suficiente. Después podrás revisar y corregir las asignaciones que lo necesiten.</p></section>

      <div className="page-actions">
        {phase === 'not-started'
          ? <button className="button primary" onClick={onGenerate}>Generar propuesta</button>
          : <button className="button primary" onClick={onContinue}>Continuar con la propuesta existente</button>}
      </div>
    </main>
  )
}
