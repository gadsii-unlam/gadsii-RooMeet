import type { AllocationResult, Assignment, Course, Room } from './types'
import { coursesOverlap, validateDataset } from './validation'

export function generateAssignments(rooms: Room[], courses: Course[]): AllocationResult {
  const dataErrors = validateDataset(rooms, courses)
  if (dataErrors.length > 0) throw new Error(dataErrors.map((error) => error.message).join(' '))

  const sortedCourses = [...courses].sort((a, b) => b.estimatedSeats - a.estimatedSeats || a.id.localeCompare(b.id))
  const sortedRooms = [...rooms].sort((a, b) => a.id.localeCompare(b.id))
  const courseById = new Map(courses.map((course) => [course.id, course]))
  let best: Assignment[] = []

  function canAssign(course: Course, room: Room, partial: Assignment[]): boolean {
    if (room.capacity < course.estimatedSeats) return false
    return partial.every((assignment) => assignment.roomId !== room.id || !coursesOverlap(course, courseById.get(assignment.courseId)!))
  }

  function search(index: number, partial: Assignment[]): boolean {
    if (partial.length > best.length) best = [...partial]
    if (index === sortedCourses.length) return true
    if (partial.length + (sortedCourses.length - index) <= best.length && best.length === sortedCourses.length) return false

    const course = sortedCourses[index]
    const assignmentCount = new Map<string, number>()
    for (const assignment of partial) assignmentCount.set(assignment.roomId, (assignmentCount.get(assignment.roomId) ?? 0) + 1)
    const candidates = sortedRooms
      .filter((room) => canAssign(course, room, partial))
      .sort((a, b) => (assignmentCount.get(a.id) ?? 0) - (assignmentCount.get(b.id) ?? 0)
        || (a.capacity - course.estimatedSeats) - (b.capacity - course.estimatedSeats)
        || a.id.localeCompare(b.id))
    for (const room of candidates) {
      partial.push({ courseId: course.id, roomId: room.id })
      if (search(index + 1, partial)) return true
      partial.pop()
    }
    search(index + 1, partial)
    return false
  }

  search(0, [])
  const assignedIds = new Set(best.map((assignment) => assignment.courseId))
  return {
    assignments: best,
    unassigned: courses.filter((course) => !assignedIds.has(course.id)).map((course) => ({ courseId: course.id, reason: 'No existe un aula compatible por capacidad y horario.' })),
  }
}
