import { useState } from 'react'
import { careers, formatCourseSchedule, getCareer, sharedCareerCount } from '../data/demoDataset'
import type { Assignment, Course, Phase, Review, Room, UnassignedCourse } from '../domain/types'

export function ProposalScreen({ rooms, courses, assignments, unassigned, reviews, phase, onApproval, onContinue }: {
  rooms: Room[]
  courses: Course[]
  assignments: Assignment[]
  unassigned: UnassignedCourse[]
  reviews: Review[]
  phase: Phase
  onApproval: (courseId: string, approved: boolean) => void
  onContinue: () => void
}) {
  const [careerFilter, setCareerFilter] = useState('all')
  const [termFilter, setTermFilter] = useState('all')
  const pending = reviews.filter((review) => !review.approved).length
  const visibleAssignments = assignments.filter((assignment) => {
    const course = courses.find((item) => item.id === assignment.courseId)!
    return (careerFilter === 'all' || course.careerId === careerFilter) && (termFilter === 'all' || course.term.toString() === termFilter)
  })
  const visibleUnassigned = unassigned.filter((item) => {
    const course = courses.find((entry) => entry.id === item.courseId)!
    return (careerFilter === 'all' || course.careerId === careerFilter) && (termFilter === 'all' || course.term.toString() === termFilter)
  })
  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading split-heading"><div><p className="eyebrow">Paso 2 · Revisión</p><h1>Revisá la propuesta</h1><p>La aprobación registra una decisión del participante de la prueba; no representa autorización institucional.</p></div><div className="progress-card"><strong>{reviews.length - pending}/{reviews.length}</strong><span>revisados</span></div></header>
      <section className="panel">
        <div className="filter-row">
          <label className="filter-control">Carrera<select value={careerFilter} onChange={(event) => setCareerFilter(event.target.value)}><option value="all">Todas las carreras</option>{careers.map((career) => <option key={career.id} value={career.id}>{career.name}</option>)}</select></label>
          <label className="filter-control">Cuatrimestre<select value={termFilter} onChange={(event) => setTermFilter(event.target.value)}><option value="all">Primer año completo</option><option value="1">1.º cuatrimestre</option><option value="2">2.º cuatrimestre</option></select></label>
        </div>
        <p className="filter-count">{visibleAssignments.length + visibleUnassigned.length} cursos visibles de {courses.length} · las aprobaciones se miden sobre el total</p>
        <div className="table-wrap">
          <table className="proposal-table">
            <thead><tr><th>Materia y carrera</th><th>Horario de prueba</th><th>Aula propuesta</th><th>Cupo / capacidad</th><th>Control</th><th>Revisión</th></tr></thead>
            <tbody>
              {visibleAssignments.map((assignment) => {
                const course = courses.find((item) => item.id === assignment.courseId)!
                const room = rooms.find((item) => item.id === assignment.roomId)!
                const review = reviews.find((item) => item.courseId === course.id)!
                return <tr key={course.id}><td><strong>{course.curriculumCode} · {course.subject}</strong><small>{getCareer(course.careerId)?.name}</small>{sharedCareerCount(course) > 1 && <small className="shared-label">Presente en {sharedCareerCount(course)} planes</small>}</td><td>{formatCourseSchedule(course)}</td><td><span className="room-pill">{room.name}</span></td><td>{course.estimatedSeats} / {room.capacity}</td><td><span className="status ok">✓ Sin solapamiento · capacidad suficiente</span></td><td><button className={`approval ${review.approved ? 'approved' : ''}`} disabled={phase === 'finished'} onClick={() => onApproval(course.id, !review.approved)}>{review.approved ? '✓ Aprobado' : 'Aprobar'}</button>{review.everModified && <small className="modified-label">Modificado</small>}</td></tr>
              })}
              {visibleUnassigned.map((item) => {
                const course = courses.find((entry) => entry.id === item.courseId)!
                return <tr key={course.id} className="error-row"><td><strong>{course.curriculumCode} · {course.subject}</strong><small>{getCareer(course.careerId)?.name}</small></td><td>{formatCourseSchedule(course)}</td><td>Sin aula</td><td>{course.estimatedSeats} / —</td><td><span className="status error">{item.reason}</span></td><td>No disponible</td></tr>
              })}
            </tbody>
          </table>
        </div>
      </section>
      <div className="page-actions between"><p>{pending > 0 ? `${pending} cursos pendientes de revisión.` : 'Toda la propuesta fue revisada.'}</p><button className="button primary" onClick={onContinue}>Revisar aulas</button></div>
    </main>
  )
}
