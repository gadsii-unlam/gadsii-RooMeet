import { describeOccupancy, hasTimeWindow, type MonitorFilters } from '../domain/monitoring'
import type { Room } from '../domain/types'

export function RoomMap({ rooms, counts, filters, selectedRoomId, onSelectRoom }: {
  rooms: Room[]
  counts: Record<string, number>
  filters: MonitorFilters
  selectedRoomId: string
  onSelectRoom: (roomId: string) => void
}) {
  const timeWindow = hasTimeWindow(filters)
  return (
    <figure className="campus-map">
      <div className="map-canvas">
        <img src="/mapa-campus.png" alt="Plano ilustrativo del campus con las cuatro aulas de prueba" />
        {rooms.map((room) => {
          const occupied = (counts[room.id] ?? 0) > 0
          const selected = selectedRoomId === room.id
          return (
            <button
              key={room.id}
              type="button"
              className={`map-marker ${occupied ? 'occupied' : 'available'} ${selected ? 'selected' : ''}`}
              style={{ left: `${room.mapPosition.xPercent}%`, top: `${room.mapPosition.yPercent}%` }}
              aria-label={`Ver ${room.name}: ${describeOccupancy(counts[room.id] ?? 0, filters)}`}
              aria-pressed={selected}
              onClick={() => onSelectRoom(room.id)}
            >
              <span>{room.name.replace('Aula ', '')}</span>
            </button>
          )
        })}
      </div>
      <div className="map-key">
        <span><span className="key-symbol occupied" aria-hidden="true" />{timeWindow ? 'Ocupada en la franja' : 'Con cursos en el filtro'}</span>
        <span><span className="key-symbol available" aria-hidden="true" />{timeWindow ? 'Libre en la franja' : 'Sin cursos en el filtro'}</span>
      </div>
      <figcaption>Ubicaciones ilustrativas, no verificadas. El listado ofrece la misma información.</figcaption>
    </figure>
  )
}
