import { formatCourseSchedule, getCareer } from '../data/demoDataset'
import type { Assignment, ChangeValidation, Course, EditContext, Room } from '../domain/types'

export function ChangeScreen({ rooms, courses, assignments, context, destinationId, getValidation, onDestination, onConfirm, onCancel }: {
  rooms: Room[]
  courses: Course[]
  assignments: Assignment[]
  context: EditContext
  destinationId: string
  getValidation: (roomId: string) => ChangeValidation
  onDestination: (roomId: string) => void
  onConfirm: () => void
  onCancel: () => void
}) {
  const course = courses.find((item) => item.id === context.courseId)!
  const origin = rooms.find((room) => room.id === context.fromRoomId)!
  const selectedRoom = rooms.find((room) => room.id === destinationId)
  const selectedValidation = destinationId ? getValidation(destinationId) : null
  const roomOptions = rooms.map((room) => {
    const validation = getValidation(room.id)
    const sameRoom = room.id === origin.id
    const occupiedBy = assignments
      .filter((assignment) => assignment.roomId === room.id && assignment.courseId !== course.id)
      .map((assignment) => courses.find((item) => item.id === assignment.courseId)!)
      .filter((item) => item.day === course.day && item.startMinutes < course.endMinutes && course.startMinutes < item.endMinutes)
    return { room, validation, sameRoom, occupiedBy }
  })
  const availableCount = roomOptions.filter((option) => option.validation.valid).length
  return (
    <main id="main-content" className="page-shell narrow-shell">
      <header className="page-heading"><p className="eyebrow">Paso 4 · Cambio local</p><h1>Modificar {course.name}</h1><p>El cambio conserva el curso, el cupo y el horario. Solo se modifica el aula seleccionada.</p></header>

      <section className="edit-context panel"><div><span>Materia y carrera</span><strong>{course.curriculumCode} · {course.subject}</strong><small>{getCareer(course.careerId)?.name}</small></div><div><span>Horario completo</span><strong>{formatCourseSchedule(course)}</strong></div><div><span>Cupo estimado</span><strong>{course.estimatedSeats} personas</strong></div><div><span>Aula actual</span><strong>{origin.name}</strong><small>Capacidad {origin.capacity}</small></div></section>

      <fieldset className="panel destination-fieldset"><legend>Elegí el aula de destino</legend><p className="availability-summary" role="status"><span className="availability-dot" aria-hidden="true" /><strong>{availableCount} {availableCount === 1 ? 'aula disponible' : 'aulas disponibles'}</strong> para {formatCourseSchedule(course)} y un cupo de {course.estimatedSeats}. Están remarcadas en verde.</p><p>Las opciones inválidas explican la causa. RooMeet no elige una alternativa automáticamente.</p><div className="destination-list">{roomOptions.map(({ room, validation, sameRoom, occupiedBy }) => {
        const reason = sameRoom ? 'Es el aula actual.' : validation.violations[0]?.message
        const stateClass = sameRoom ? 'current' : validation.valid ? 'available' : 'invalid'
        return <label key={room.id} className={`destination-option ${stateClass}`}><input type="radio" name="destination" value={room.id} checked={destinationId === room.id} disabled={!validation.valid} onChange={() => onDestination(room.id)} /><span className="radio-visual" /><span className="destination-copy"><strong>{room.name}<small>Capacidad {room.capacity}</small></strong>{validation.valid ? <span className="status ok">✓ Libre para este horario · capacidad suficiente</span> : <span className={sameRoom ? 'status' : 'status error'}>{reason}</span>}{occupiedBy.length > 0 && <small>En conflicto: {occupiedBy.map((item) => item.name).join(', ')}</small>}</span></label>
      })}</div></fieldset>

      {selectedRoom && selectedValidation?.valid && <section className="change-preview" aria-live="polite"><span>Resumen del cambio</span><strong>{course.name}: {origin.name} → {selectedRoom.name}</strong><small>{formatCourseSchedule(course)} · Cupo {course.estimatedSeats} · destino {selectedRoom.capacity} lugares</small></section>}

      <div className="page-actions between"><button className="button secondary" onClick={onCancel}>Cancelar</button><button className="button primary" disabled={!selectedValidation?.valid} onClick={onConfirm}>Confirmar cambio local</button></div>
    </main>
  )
}
