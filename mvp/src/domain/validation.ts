import type { Assignment, ChangeValidation, Course, EditContext, Room, SessionState, Violation } from './types'

export function coursesOverlap(a: Course, b: Course): boolean {
  return a.term === b.term && a.day === b.day && a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes
}

export function validateDataset(rooms: Room[], courses: Course[]): Violation[] {
  const violations: Violation[] = []
  const roomIds = new Set<string>()
  const courseIds = new Set<string>()

  for (const room of rooms) {
    if (!room.id || !room.name || !Number.isFinite(room.capacity) || room.capacity <= 0 || roomIds.has(room.id)) {
      violations.push({ code: 'invalid-data', message: `El aula ${room.id || '(sin ID)'} tiene datos inválidos o un ID duplicado.`, courseIds: [], roomId: room.id })
    }
    roomIds.add(room.id)
  }

  for (const course of courses) {
    const invalidInterval = course.startMinutes < 0 || course.startMinutes >= course.endMinutes || course.endMinutes > 1440
    if (!course.id || !course.name || courseIds.has(course.id) || invalidInterval || course.day < 1 || course.day > 5 || ![1, 2].includes(course.term) || course.estimatedSeats <= 0) {
      violations.push({ code: 'invalid-data', message: `El curso ${course.id || '(sin ID)'} tiene datos inválidos o un ID duplicado.`, courseIds: [course.id] })
    }
    courseIds.add(course.id)
  }
  return violations
}

export function validateAssignments(rooms: Room[], courses: Course[], assignments: Assignment[]): Violation[] {
  const violations: Violation[] = [...validateDataset(rooms, courses)]
  const roomById = new Map(rooms.map((room) => [room.id, room]))
  const courseById = new Map(courses.map((course) => [course.id, course]))
  const seenCourses = new Set<string>()

  for (const assignment of assignments) {
    const course = courseById.get(assignment.courseId)
    const room = roomById.get(assignment.roomId)
    if (!course) violations.push({ code: 'invalid-course', message: `No existe el curso ${assignment.courseId}.`, courseIds: [assignment.courseId] })
    if (!room) violations.push({ code: 'invalid-room', message: `No existe el aula ${assignment.roomId}.`, courseIds: [assignment.courseId], roomId: assignment.roomId })
    if (seenCourses.has(assignment.courseId)) violations.push({ code: 'duplicate-course', message: `El curso ${assignment.courseId} tiene más de una asignación.`, courseIds: [assignment.courseId] })
    seenCourses.add(assignment.courseId)
    if (course && room && room.capacity < course.estimatedSeats) {
      violations.push({ code: 'capacity', message: `${course.name} requiere ${course.estimatedSeats} lugares y ${room.name} tiene capacidad para ${room.capacity}.`, courseIds: [course.id], roomId: room.id })
    }
  }

  for (let i = 0; i < assignments.length; i += 1) {
    for (let j = i + 1; j < assignments.length; j += 1) {
      const left = assignments[i]
      const right = assignments[j]
      if (left.roomId !== right.roomId) continue
      const leftCourse = courseById.get(left.courseId)
      const rightCourse = courseById.get(right.courseId)
      if (leftCourse && rightCourse && coursesOverlap(leftCourse, rightCourse)) {
        violations.push({
          code: 'overlap',
          message: `${leftCourse.name} se superpone con ${rightCourse.name} en ${roomById.get(left.roomId)?.name ?? left.roomId}.`,
          courseIds: [left.courseId, right.courseId],
          roomId: left.roomId,
        })
      }
    }
  }
  return violations
}

export function validateChange(
  rooms: Room[],
  courses: Course[],
  state: SessionState,
  input: EditContext & { toRoomId: string },
): ChangeValidation {
  if (state.phase === 'finished') return { valid: false, violations: [{ code: 'finished-session', message: 'La revisión ya fue finalizada.', courseIds: [input.courseId] }] }
  if (state.revision !== input.expectedRevision) return { valid: false, violations: [{ code: 'stale-context', message: 'La propuesta cambió desde que abriste esta edición. Volvé a intentarlo.', courseIds: [input.courseId] }] }
  const current = state.currentAssignments.find((assignment) => assignment.courseId === input.courseId)
  if (!current || current.roomId !== input.fromRoomId) return { valid: false, violations: [{ code: 'stale-context', message: 'El aula de origen ya no coincide con el estado actual.', courseIds: [input.courseId] }] }
  if (input.fromRoomId === input.toRoomId) return { valid: false, violations: [{ code: 'same-room', message: 'Elegí un aula diferente de la actual.', courseIds: [input.courseId], roomId: input.toRoomId }] }
  const next = state.currentAssignments.map((assignment) => assignment.courseId === input.courseId ? { ...assignment, roomId: input.toRoomId } : assignment)
  const violations = validateAssignments(rooms, courses, next).filter((violation) => violation.courseIds.includes(input.courseId))
  return { valid: violations.length === 0, violations }
}
