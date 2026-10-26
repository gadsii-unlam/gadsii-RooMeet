import { ChangeSummary } from '../components/ChangeSummary'
import { RoomMap } from '../components/RoomMap'
import { formatCourseSchedule, getCareer, scheduleOptions } from '../data/demoDataset'
import type { Assignment, Course, LastChange, Phase, PilotMetrics, Review, Room } from '../domain/types'

export function MonitoringScreen({ rooms, courses, assignments, reviews, phase, selectedRoomId, selectedScheduleKey, lastChange, statusMessage, metrics, canFinish, onSelectRoom, onSelectSchedule, onEdit, onUndo, onFinish, onExport, onNew }: {
  rooms: Room[]
  courses: Course[]
  assignments: Assignment[]
  reviews: Review[]
  phase: Phase
  selectedRoomId: string
  selectedScheduleKey: string
  lastChange: LastChange | null
  statusMessage: string | null
  metrics: PilotMetrics
  canFinish: boolean
  onSelectRoom: (roomId: string) => void
  onSelectSchedule: (key: string) => void
  onEdit: (courseId: string, roomId: string) => void
  onUndo: () => void
  onFinish: () => void
  onExport: () => void
  onNew: () => void
}) {
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? rooms[0]
  const selectedCourse = scheduleOptions.find((course) => `${course.term}-${course.day}-${course.startMinutes}-${course.endMinutes}` === selectedScheduleKey) ?? null
  const roomAssignments = assignments.filter((assignment) => assignment.roomId === selectedRoom.id).map((assignment) => ({ assignment, course: courses.find((course) => course.id === assignment.courseId)! }))
  const visibleRoomAssignments = selectedCourse ? roomAssignments.filter(({ course }) => course.term === selectedCourse.term && course.day === selectedCourse.day && course.startMinutes < selectedCourse.endMinutes && selectedCourse.startMinutes < course.endMinutes) : roomAssignments
  const occupied = visibleRoomAssignments.length > 0

  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading split-heading"><div><p className="eyebrow">Paso 3 · Monitoreo y corrección</p><h1>Consultá la ocupación</h1><p>Elegí una franja y un aula. Los cuatrimestres se evalúan por separado y el listado respalda el plano.</p></div><label className="filter-control">Horario<select value={selectedScheduleKey} onChange={(event) => onSelectSchedule(event.target.value)}><option value="all">Todos los horarios</option>{scheduleOptions.map((course) => <option key={`${course.term}-${course.day}-${course.startMinutes}-${course.endMinutes}`} value={`${course.term}-${course.day}-${course.startMinutes}-${course.endMinutes}`}>{formatCourseSchedule(course)}</option>)}</select></label></header>

      <ChangeSummary change={lastChange} message={statusMessage} canUndo={phase === 'running'} onUndo={onUndo} />

      <div className="monitor-grid">
        <section className="panel map-panel"><h2>Mapa de aulas</h2><RoomMap rooms={rooms} courses={courses} assignments={assignments} selectedRoomId={selectedRoom.id} selectedCourse={selectedCourse} onSelectRoom={onSelectRoom} /></section>
        <aside className="panel room-detail">
          <div className="detail-header"><div><p className="eyebrow">Aula seleccionada</p><h2>{selectedRoom.name}</h2></div><strong>{selectedRoom.capacity}<small> lugares</small></strong></div>
          <span className={`availability ${occupied ? 'occupied' : 'available'}`}>{occupied ? selectedCourse ? 'Ocupada en este horario' : 'Con asignaciones' : selectedCourse ? 'Disponible en este horario' : 'Sin asignaciones'}</span>
          <div className="course-list">
            {visibleRoomAssignments.length === 0 && <p className="empty-state">No hay cursos en esta aula para el filtro elegido.</p>}
            {visibleRoomAssignments.map(({ assignment, course }) => <article className="course-item" key={course.id}><div><strong>{course.curriculumCode} · {course.subject}</strong><span>{getCareer(course.careerId)?.name}</span><small>{formatCourseSchedule(course)} · Cupo {course.estimatedSeats}</small></div>{phase === 'running' && <button className="text-button" onClick={() => onEdit(course.id, assignment.roomId)}>Modificar {course.name}</button>}</article>)}
          </div>
        </aside>
      </div>

      <section className="panel room-list-panel"><div className="section-title"><div><h2>Listado de respaldo</h2><p>La disponibilidad no depende de interpretar el mapa.</p></div></div><div className="room-list">{rooms.map((room) => {
        const items = assignments.filter((assignment) => assignment.roomId === room.id).map((assignment) => courses.find((course) => course.id === assignment.courseId)!).filter(Boolean)
        const filtered = selectedCourse ? items.filter((course) => course.term === selectedCourse.term && course.day === selectedCourse.day && course.startMinutes < selectedCourse.endMinutes && selectedCourse.startMinutes < course.endMinutes) : items
        return <article key={room.id} className={room.id === selectedRoom.id ? 'room-list-item selected' : 'room-list-item'}><button className="room-select" onClick={() => onSelectRoom(room.id)}><strong>{room.name}</strong><span>{room.capacity} lugares</span></button><div>{filtered.length ? filtered.map((course) => <span className="schedule-chip" key={course.id}>{course.curriculumCode} · {course.subject} · {formatCourseSchedule(course)}</span>) : <span className="schedule-chip free">Disponible</span>}</div></article>
      })}</div></section>

      <section className="metrics-panel" aria-label="Resumen de evidencia de la prueba"><div><span>Cobertura</span><strong>{metrics.coveragePercent.toFixed(0)}%</strong></div><div><span>Aprobación sin cambios</span><strong>{metrics.approvedWithoutChangesPercent.toFixed(0)}%</strong></div><div><span>Conflictos vigentes</span><strong>{metrics.finalOverlaps + metrics.finalCapacityExcesses}</strong></div><div><span>Estado</span><strong>{phase === 'finished' ? 'Finalizada' : `${reviews.filter((review) => review.approved).length}/${reviews.length} revisados`}</strong></div></section>

      <div className="page-actions between wrap"><div className="action-group"><button className="button secondary" onClick={onExport}>Exportar prueba</button><button className="button ghost" onClick={onNew}>Nueva prueba</button></div>{phase === 'running' ? <button className="button primary" disabled={!canFinish} onClick={onFinish}>Finalizar revisión</button> : <span className="finished-badge">✓ Revisión finalizada</span>}</div>
      {!canFinish && phase === 'running' && <p className="finish-hint">Para finalizar, asigná y aprobá todos los cursos y resolvé cualquier conflicto.</p>}
    </main>
  )
}
