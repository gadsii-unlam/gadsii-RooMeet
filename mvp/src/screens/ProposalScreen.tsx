import { useState } from 'react'
import { careers, formatCourseSchedule, getCareer, sharedCareerCount } from '../data/demoDataset'
import type { Assignment, Course, Room, UnassignedCourse } from '../domain/types'

export function ProposalScreen({ rooms, courses, assignments, unassigned, onContinue }: {
  rooms: Room[]
  courses: Course[]
  assignments: Assignment[]
  unassigned: UnassignedCourse[]
  onContinue: () => void
}) {
  const [careerFilter, setCareerFilter] = useState('all')
  const visibleAssignments = assignments.filter((assignment) => {
    const course = courses.find((item) => item.id === assignment.courseId)!
    return careerFilter === 'all' || course.careerId === careerFilter
  })
  const visibleUnassigned = unassigned.filter((item) => {
    const course = courses.find((entry) => entry.id === item.courseId)!
    return careerFilter === 'all' || course.careerId === careerFilter
  })
  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading"><p className="eyebrow">Paso 2 · Revisión · Cuatrimestre vigente</p><h1>Revisá la propuesta completa</h1><p>Consultá las aulas sugeridas para todos los cursos. Si necesitás ajustar una asignación, podés hacerlo desde la agenda del aula.</p></header>
      <section className="panel">
        <div className="filter-row">
          <label className="filter-control">Carrera<select value={careerFilter} onChange={(event) => setCareerFilter(event.target.value)}><option value="all">Todas las carreras</option>{careers.map((career) => <option key={career.id} value={career.id}>{career.name}</option>)}</select></label>
        </div>
        <p className="filter-count">{visibleAssignments.length + visibleUnassigned.length} cursos visibles de {courses.length}</p>
        <div className="table-wrap">
          <table className="proposal-table">
            <thead><tr><th>Materia y carrera</th><th>Horario de prueba</th><th>Aula propuesta</th><th>Cupo / capacidad</th><th>Control</th></tr></thead>
            <tbody>
              {visibleAssignments.map((assignment) => {
                const course = courses.find((item) => item.id === assignment.courseId)!
                const room = rooms.find((item) => item.id === assignment.roomId)!
                return <tr key={course.id}><td><strong>{course.curriculumCode} · {course.subject}</strong><small>{getCareer(course.careerId)?.name}</small>{sharedCareerCount(course) > 1 && <small className="shared-label">Presente en {sharedCareerCount(course)} planes</small>}</td><td>{formatCourseSchedule(course)}</td><td><span className="room-pill">{room.name}</span></td><td>{course.estimatedSeats} / {room.capacity}</td><td><span className="status ok">✓ Sin solapamiento · capacidad suficiente</span></td></tr>
              })}
              {visibleUnassigned.map((item) => {
                const course = courses.find((entry) => entry.id === item.courseId)!
                return <tr key={course.id} className="error-row"><td><strong>{course.curriculumCode} · {course.subject}</strong><small>{getCareer(course.careerId)?.name}</small></td><td>{formatCourseSchedule(course)}</td><td>Sin aula</td><td>{course.estimatedSeats} / —</td><td><span className="status error">{item.reason}</span></td></tr>
              })}
            </tbody>
          </table>
        </div>
      </section>
      <div className="page-actions between"><p>Podés consultar la ocupación y modificar asignaciones desde la agenda de cada aula.</p><button className="button primary" onClick={onContinue}>Revisar aulas</button></div>
    </main>
  )
}
