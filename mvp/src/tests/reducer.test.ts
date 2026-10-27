import { describe, expect, it } from 'vitest'
import { generateAssignments } from '../domain/allocation'
import { courses, rooms } from '../data/demoDataset'
import { initialState, sessionReducer } from '../state/reducer'

describe('sessionReducer', () => {
  it('modifica únicamente el curso identificado y registra la modificación', () => {
    const result = generateAssignments(rooms, courses.filter((course) => course.term === 1))
    const unchanged = result.assignments[0]
    const changed = result.assignments[1]
    const destination = rooms.find((room) => room.id !== changed.roomId)!.id
    let state = sessionReducer(initialState, { type: 'GENERATE', result, sessionId: 's1', planningTerm: 1, now: '2026-01-01T00:00:00.000Z', eventId: 'e1' })
    const before = state.currentAssignments.find((item) => item.courseId === unchanged.courseId)
    state = sessionReducer(state, { type: 'APPLY_CHANGE', courseId: changed.courseId, fromRoomId: changed.roomId, toRoomId: destination, changeId: 'c1', message: 'ok', now: '2026-01-01T00:01:00.000Z', eventId: 'e2' })
    expect(state.currentAssignments.find((item) => item.courseId === unchanged.courseId)).toEqual(before)
    expect(state.currentAssignments.find((item) => item.courseId === changed.courseId)?.roomId).toBe(destination)
    expect(state.assignmentEvidence.find((item) => item.courseId === changed.courseId)).toEqual({ courseId: changed.courseId, everModified: true })
  })

  it('deshace sin borrar la evidencia de modificación', () => {
    const result = generateAssignments(rooms, courses.filter((course) => course.term === 1))
    const changed = result.assignments[0]
    const destination = rooms.find((room) => room.id !== changed.roomId)!.id
    let state = sessionReducer(initialState, { type: 'GENERATE', result, sessionId: 's1', planningTerm: 1, now: '2026-01-01T00:00:00.000Z', eventId: 'e1' })
    state = sessionReducer(state, { type: 'APPLY_CHANGE', courseId: changed.courseId, fromRoomId: changed.roomId, toRoomId: destination, changeId: 'c1', message: 'ok', now: '2026-01-01T00:01:00.000Z', eventId: 'e2' })
    state = sessionReducer(state, { type: 'UNDO_CHANGE', message: 'restaurado', now: '2026-01-01T00:02:00.000Z', eventId: 'e3' })
    expect(state.currentAssignments.find((item) => item.courseId === changed.courseId)?.roomId).toBe(changed.roomId)
    expect(state.assignmentEvidence.find((item) => item.courseId === changed.courseId)?.everModified).toBe(true)
    expect(state.events.map((event) => event.type)).toContain('change-undone')
  })
})
