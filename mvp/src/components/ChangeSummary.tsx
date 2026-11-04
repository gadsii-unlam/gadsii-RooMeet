import { formatCourseSchedule, getCourse } from '../data/demoDataset'
import type { LastChange } from '../domain/types'

export function ChangeSummary({ change, message, canUndo, onUndo }: { change: LastChange | null; message: string | null; canUndo: boolean; onUndo: () => void }) {
  if (!message) return null
  const course = change ? getCourse(change.courseId) : undefined
  return (
    <section className="change-summary" role="status" aria-live="polite">
      <div>
        <strong>Última actualización</strong>
        <p>{message}</p>
        {course && <small>{course.subject} · {formatCourseSchedule(course)}</small>}
      </div>
      {change && canUndo && (
        <button className="button secondary" onClick={onUndo}>
          Deshacer cambio de {course?.name ?? change.courseId}
        </button>
      )}
    </section>
  )
}
