import { describe, expect, it } from 'vitest'
import { generateAssignments } from '../domain/allocation'
import { careers, courses, rooms, sharedCareerCount } from '../data/demoDataset'
import type { Course, Room } from '../domain/types'
import { validateAssignments, validateChange } from '../domain/validation'
import { initialState } from '../state/reducer'

describe('generateAssignments', () => {
  it('asigna la propuesta completa del cuatrimestre vigente y sin conflictos', () => {
    expect(careers).toHaveLength(6)
    expect(courses).toHaveLength(65)
    expect(new Set(courses.map((course) => course.id)).size).toBe(courses.length)
    expect(courses.filter((course) => course.careerId === 'informatica')).toHaveLength(12)
    expect(courses.filter((course) => course.careerId === 'civil')).toHaveLength(11)
    expect(courses.filter((course) => course.careerId === 'mecanica')).toHaveLength(8)
    expect(sharedCareerCount(courses.find((course) => course.curriculumCode === '3622')!)).toBeGreaterThan(1)
    const result = generateAssignments(rooms, courses)
    expect(result.unassigned).toEqual([])
    expect(result.assignments).toHaveLength(courses.length)
    expect(validateAssignments(rooms, courses, result.assignments)).toEqual([])
    const state = { ...initialState, phase: 'running' as const, currentAssignments: result.assignments, originalAssignments: result.assignments }
    const hasValidAlternative = result.assignments.some((assignment) => rooms.some((room) => validateChange(rooms, courses, state, {
      courseId: assignment.courseId,
      fromRoomId: assignment.roomId,
      toRoomId: room.id,
      expectedRevision: 0,
    }).valid))
    expect(hasValidAlternative).toBe(true)
  })

  it('usa retroceso cuando una elección voraz deja un curso sin aula', () => {
    const testRooms: Room[] = [
      { id: 'R1', name: 'R1', capacity: 40, mapPosition: { xPercent: 0, yPercent: 0 } },
      { id: 'R2', name: 'R2', capacity: 60, mapPosition: { xPercent: 0, yPercent: 0 } },
    ]
    const makeCourse = (id: string, seats: number, startMinutes: number, endMinutes: number): Course => ({ id, name: id, subject: id, curriculumCode: id, careerId: 'test', weeklyHours: 1, estimatedSeats: seats, enrollmentHistory: [], day: 1, startMinutes, endMinutes })
    const testCourses = [makeCourse('X', 60, 1080, 1140), makeCourse('Y', 40, 1140, 1200), makeCourse('Z', 40, 1110, 1170)]
    const result = generateAssignments(testRooms, testCourses)
    expect(result.unassigned).toEqual([])
    expect(result.assignments).toContainEqual({ courseId: 'Z', roomId: 'R1' })
    expect(result.assignments).toContainEqual({ courseId: 'X', roomId: 'R2' })
    expect(result.assignments).toContainEqual({ courseId: 'Y', roomId: 'R2' })
  })
})
