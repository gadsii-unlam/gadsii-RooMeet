import { useRef, useState } from 'react'
import { ChangeSummary } from '../components/ChangeSummary'
import { RoomMap } from '../components/RoomMap'
import { formatTimeRange, getCareer } from '../data/demoDataset'
import { AGENDA_PAGE_SIZE, DAY_OPTIONS, SLOT_OPTIONS, compareBySchedule, dayLabel, describeFilters, describeOccupancy, hasTimeWindow, matchesFilters, matchesQuery, type MonitorFilters } from '../domain/monitoring'
import type { Assignment, Course, Day, LastChange, Phase, PilotMetrics, Room } from '../domain/types'

export function MonitoringScreen({ rooms, courses, assignments, phase, selectedRoomId, filters, lastChange, statusMessage, metrics, canFinish, onSelectRoom, onFiltersChange, onResetFilters, onEdit, onUndo, onFinish, onExport, onNew }: {
  rooms: Room[]
  courses: Course[]
  assignments: Assignment[]
  phase: Phase
  selectedRoomId: string
  filters: MonitorFilters
  lastChange: LastChange | null
  statusMessage: string | null
  metrics: PilotMetrics
  canFinish: boolean
  onSelectRoom: (roomId: string) => void
  onFiltersChange: (filters: MonitorFilters) => void
  onResetFilters: () => void
  onEdit: (courseId: string, roomId: string) => void
  onUndo: () => void
  onFinish: () => void
  onExport: () => void
  onNew: () => void
}) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const roomTitle = useRef<HTMLHeadingElement>(null)
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? rooms[0]
  const courseById = new Map(courses.map((course) => [course.id, course]))
  const filteredByRoom = Object.fromEntries(rooms.map((room) => [room.id, assignments
    .filter((assignment) => assignment.roomId === room.id)
    .map((assignment) => courseById.get(assignment.courseId))
    .filter((course): course is Course => !!course && matchesFilters(course, filters))
    .sort(compareBySchedule)]))
  const counts = Object.fromEntries(rooms.map((room) => [room.id, filteredByRoom[room.id].length]))
  const totalInFilter = Object.values(counts).reduce((sum, count) => sum + count, 0)
  const roomCourses = filteredByRoom[selectedRoom.id]
  const matches = roomCourses.filter((course) => matchesQuery(course, getCareer(course.careerId)?.name ?? '', query))
  const pages = Math.max(1, Math.ceil(matches.length / AGENDA_PAGE_SIZE))
  const currentPage = Math.min(page, pages - 1)
  const offset = currentPage * AGENDA_PAGE_SIZE
  const visible = matches.slice(offset, offset + AGENDA_PAGE_SIZE)
  const searching = query.trim() !== ''
  const timeWindow = hasTimeWindow(filters)

  const selectRoom = (roomId: string, focus = false) => {
    onSelectRoom(roomId)
    setQuery('')
    setPage(0)
    if (focus) {
      roomTitle.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      roomTitle.current?.focus({ preventScroll: true })
    }
  }

  const changeFilters = (next: MonitorFilters) => {
    onFiltersChange(next)
    setQuery('')
    setPage(0)
  }

  const resetFilters = () => {
    onResetFilters()
    setQuery('')
    setPage(0)
  }

  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading"><p className="eyebrow">Paso 3 · Monitoreo y corrección · Cuatrimestre vigente</p><h1>Consultá la ocupación</h1><p>Compará las aulas en el listado y abrí una agenda para revisar sus cursos. Los filtros se aplican al mapa, a la agenda y al listado.</p></header>

      <section className="monitor-filters" aria-label="Filtros de ocupación">
        <label className="filter-control">Día<select value={filters.day} onChange={(event) => changeFilters({ ...filters, day: Number(event.target.value) as Day | 0 })}>{DAY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label className="filter-control">Franja<select value={filters.slot} onChange={(event) => changeFilters({ ...filters, slot: event.target.value })}>{SLOT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <button type="button" className="button secondary" onClick={resetFilters}>Restablecer</button>
      </section>
      <p className="filter-count" aria-live="polite">{describeFilters(filters)} · {totalInFilter} {totalInFilter === 1 ? 'curso' : 'cursos'} en el filtro</p>

      <ChangeSummary change={lastChange} message={statusMessage} canUndo={phase === 'running'} onUndo={onUndo} />

      <div className="monitor-grid">
        <section className="panel map-panel"><h2>Mapa de aulas</h2><RoomMap rooms={rooms} counts={counts} filters={filters} selectedRoomId={selectedRoom.id} onSelectRoom={(roomId) => selectRoom(roomId)} /></section>
        <section className="panel room-detail" aria-labelledby="room-title">
          <div className="detail-header"><div><p className="eyebrow">Agenda del aula</p><h2 id="room-title" ref={roomTitle} tabIndex={-1}>{selectedRoom.name}</h2></div><strong>{selectedRoom.capacity}<small> lugares</small></strong></div>
          <p className="agenda-scope">{describeFilters(filters)}</p>
          <label className="agenda-search">Buscar en esta aula<input type="search" value={query} placeholder="Materia, código o carrera" autoComplete="off" onChange={(event) => { setQuery(event.target.value); setPage(0) }} /></label>
          <div className="agenda-count"><strong>{searching ? `${matches.length} de ${roomCourses.length} cursos coinciden` : `${roomCourses.length} ${roomCourses.length === 1 ? 'curso' : 'cursos'} en el filtro`}</strong><span aria-live="polite">{matches.length ? `${offset + 1}–${offset + visible.length} de ${matches.length}` : ''}</span></div>
          <div className="room-agenda">
            {visible.length === 0 && <p className="agenda-empty">{searching ? 'No hay coincidencias en esta agenda. Probá con otra materia, código o carrera.' : 'No hay cursos asignados a esta aula para los filtros elegidos.'}</p>}
            {visible.map((course) => {
              const career = getCareer(course.careerId)?.name ?? ''
              return <details className="agenda-course" key={course.id}>
                <summary><span className="course-slot"><span>{dayLabel(course.day)}</span><strong>{formatTimeRange(course)}</strong></span><span className="course-title">{course.subject}<small>{course.curriculumCode} · {career.replace(/^Ingeniería /, '')}</small></span></summary>
                <div className="course-extra"><dl><dt>Código</dt><dd>{course.curriculumCode}</dd><dt>Carrera</dt><dd>{career}</dd><dt>Cupo</dt><dd>{course.estimatedSeats} de {selectedRoom.capacity} lugares</dd></dl>{phase === 'running' && <button type="button" className="button primary small" onClick={() => onEdit(course.id, selectedRoom.id)}>Cambiar aula <span className="visually-hidden">de {course.subject}, {career}</span>→</button>}</div>
              </details>
            })}
          </div>
          {matches.length > AGENDA_PAGE_SIZE && <nav className="agenda-pagination" aria-label="Páginas de la agenda"><button type="button" className="button secondary small" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)} aria-label="Página anterior de cursos">← Anterior</button><span>{currentPage + 1} de {pages}</span><button type="button" className="button secondary small" disabled={currentPage === pages - 1} onClick={() => setPage(currentPage + 1)} aria-label="Página siguiente de cursos">Siguiente →</button></nav>}
        </section>
      </div>

      <section className="panel room-list-panel" aria-labelledby="backup-title">
        <div className="backup-heading"><div><h2 id="backup-title">Listado de respaldo</h2><p>Una fila por aula. El detalle de cada curso se consulta en su agenda.</p></div><span>{rooms.length} aulas</span></div>
        <div className="table-scroll"><table className="backup-table"><caption className="visually-hidden">Resumen de aulas para los filtros seleccionados</caption><thead><tr><th scope="col">Aula</th><th scope="col">Capacidad</th><th scope="col">Ocupación en el filtro</th><th scope="col"><span className="visually-hidden">Consultar</span></th></tr></thead><tbody>{rooms.map((room) => {
          const count = counts[room.id]
          const selected = room.id === selectedRoom.id
          return <tr key={room.id} className={selected ? 'selected-row' : undefined}><th scope="row">{room.name}{selected && <small className="selected-tag">Seleccionada</small>}</th><td>{room.capacity} lugares</td><td><span className={`occupancy-label ${count ? '' : 'empty'}`}>{describeOccupancy(count, filters)}</span>{timeWindow && count > 0 && <small>{count} {count === 1 ? 'curso' : 'cursos'} en esta franja</small>}</td><td><button type="button" className="button secondary small" onClick={() => selectRoom(room.id, true)}>Ver agenda <span className="visually-hidden">de {room.name}</span>↗</button></td></tr>
        })}</tbody></table></div>
      </section>

      <section className="metrics-panel" aria-label="Resumen de evidencia de la prueba"><div><span>Cobertura</span><strong>{metrics.coveragePercent.toFixed(0)}%</strong></div><div><span>Sin modificaciones</span><strong>{metrics.unchangedAssignmentsPercent.toFixed(0)}%</strong></div><div><span>Conflictos vigentes</span><strong>{metrics.finalOverlaps + metrics.finalCapacityExcesses}</strong></div><div><span>Estado</span><strong>{phase === 'finished' ? 'Finalizada' : 'En revisión'}</strong></div></section>

      <div className="page-actions between wrap"><div className="action-group"><button className="button secondary" onClick={onExport}>Exportar prueba</button><button className="button ghost" onClick={onNew}>Nueva prueba</button></div>{phase === 'running' ? <button className="button primary" disabled={!canFinish} onClick={onFinish}>Finalizar revisión</button> : <span className="finished-badge">✓ Revisión finalizada</span>}</div>
      {!canFinish && phase === 'running' && <p className="finish-hint">Para finalizar, todos los cursos deben tener un aula válida y no presentar conflictos.</p>}
    </main>
  )
}
