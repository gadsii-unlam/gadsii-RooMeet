import { describe, expect, it } from 'vitest'
import { coursesOverlap, validateAssignments, validateChange } from '../domain/validation'
import { courses, rooms } from '../data/demoDataset'
import type { Course } from '../domain/types'
import { initialState } from '../state/reducer'

const base = courses[0]
const makeCourse = (id: string, seats: number, term: 1 | 2, startMinutes: number, endMinutes: number): Course => ({
  ...base, id, name: `Curso ${id}`, curriculumCode: id, subject: id,
  estimatedSeats: seats, term, day: 1, startMinutes, endMinutes,
})

describe('reglas de horarios y cambios', () => {
  it('acepta intervalos consecutivos y rechaza los superpuestos', () => {
    const a = makeCourse('A', 35, 1, 1080, 1200)
    expect(coursesOverlap(a, makeCourse('B', 35, 1, 1200, 1320))).toBe(false)
    expect(coursesOverlap(a, makeCourse('B', 35, 2, 1140, 1260))).toBe(false)
    expect(coursesOverlap(a, makeCourse('B', 35, 1, 1140, 1260))).toBe(true)
  })

  it('bloquea conflicto y capacidad, y acepta un destino libre', () => {
    const testCourses = [makeCourse('A', 35, 1, 1080, 1200), makeCourse('B', 35, 1, 1080, 1200), makeCourse('C', 55, 2, 1080, 1200)]
    const assignments = [{ courseId: 'A', roomId: 'room-1' }, { courseId: 'B', roomId: 'room-2' }, { courseId: 'C', roomId: 'room-2' }]
    const state = { ...initialState, phase: 'running' as const, revision: 1, currentAssignments: assignments, originalAssignments: assignments }
    expect(validateChange(rooms, testCourses, state, { courseId: 'A', fromRoomId: 'room-1', toRoomId: 'room-2', expectedRevision: 1 }).violations.some((item) => item.code === 'overlap')).toBe(true)
    expect(validateChange(rooms, testCourses, state, { courseId: 'C', fromRoomId: 'room-2', toRoomId: 'room-3', expectedRevision: 1 }).violations.some((item) => item.code === 'capacity')).toBe(true)
    expect(validateChange(rooms, testCourses, state, { courseId: 'A', fromRoomId: 'room-1', toRoomId: 'room-3', expectedRevision: 1 }).valid).toBe(true)
  })

  it('detecta cursos duplicados y datos referencialmente inválidos', () => {
    const violations = validateAssignments(rooms, courses, [{ courseId: courses[0].id, roomId: 'room-1' }, { courseId: courses[0].id, roomId: 'room-3' }])
    expect(violations.some((item) => item.code === 'duplicate-course')).toBe(true)
  })
})
