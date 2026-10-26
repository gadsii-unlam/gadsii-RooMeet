import type { Assignment, Course, Room } from '../domain/types'

export function RoomMap({ rooms, courses, assignments, selectedRoomId, selectedCourse, onSelectRoom }: {
  rooms: Room[]
  courses: Course[]
  assignments: Assignment[]
  selectedRoomId: string
  selectedCourse: Course | null
  onSelectRoom: (roomId: string) => void
}) {
  return (
    <figure className="campus-map">
      <div className="map-canvas">
        <img src="/mapa-campus.png" alt="Plano ilustrativo del campus con las tres aulas de prueba" />
        {rooms.map((room) => {
          const occupied = selectedCourse
            ? assignments.some((assignment) => assignment.roomId === room.id && courses.find((course) => course.id === assignment.courseId)?.term === selectedCourse.term && courses.find((course) => course.id === assignment.courseId)?.day === selectedCourse.day && (courses.find((course) => course.id === assignment.courseId)?.startMinutes ?? 0) < selectedCourse.endMinutes && selectedCourse.startMinutes < (courses.find((course) => course.id === assignment.courseId)?.endMinutes ?? 0))
            : assignments.some((assignment) => assignment.roomId === room.id)
          return (
            <button
              key={room.id}
              type="button"
              className={`map-marker ${occupied ? 'occupied' : 'available'} ${selectedRoomId === room.id ? 'selected' : ''}`}
              style={{ left: `${room.mapPosition.xPercent}%`, top: `${room.mapPosition.yPercent}%` }}
              aria-label={`${room.name}, ${occupied ? selectedCourse ? 'ocupada en este horario' : 'con asignaciones' : selectedCourse ? 'disponible en este horario' : 'sin asignaciones'}`}
              onClick={() => onSelectRoom(room.id)}
            >
              <span>{room.name.replace('Aula ', '')}</span>
            </button>
          )
        })}
      </div>
      <figcaption>Ubicaciones ilustrativas, no verificadas. El listado ofrece la misma información.</figcaption>
    </figure>
  )
}
