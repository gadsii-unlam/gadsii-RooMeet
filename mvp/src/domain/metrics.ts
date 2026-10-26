import type { Assignment, Course, PilotMetrics, Room, SessionState } from './types'
import { validateAssignments } from './validation'

function countCode(rooms: Room[], courses: Course[], assignments: Assignment[], code: 'overlap' | 'capacity'): number {
  return validateAssignments(rooms, courses, assignments).filter((violation) => violation.code === code).length
}

export function calculatePilotMetrics(state: SessionState, rooms: Room[], courses: Course[]): PilotMetrics {
  const approvedWithoutChanges = state.reviews.filter((review) => review.approved && !review.everModified).length
  const duration = state.startedAt && state.finishedAt ? Date.parse(state.finishedAt) - Date.parse(state.startedAt) : Number.NaN
  return {
    totalCourses: courses.length,
    assignedCourses: state.currentAssignments.length,
    coveragePercent: courses.length ? (state.currentAssignments.length / courses.length) * 100 : 0,
    originalOverlaps: countCode(rooms, courses, state.originalAssignments, 'overlap'),
    finalOverlaps: countCode(rooms, courses, state.currentAssignments, 'overlap'),
    originalCapacityExcesses: countCode(rooms, courses, state.originalAssignments, 'capacity'),
    finalCapacityExcesses: countCode(rooms, courses, state.currentAssignments, 'capacity'),
    approvedWithoutChanges,
    approvedWithoutChangesPercent: courses.length ? (approvedWithoutChanges / courses.length) * 100 : 0,
    effectiveChanges: state.events.filter((event) => event.type === 'change-confirmed').length,
    durationMs: Number.isFinite(duration) && duration >= 0 ? duration : null,
  }
}
