import { describe, expect, it } from 'vitest'
import { generateAssignments } from '../domain/allocation'
import { careers, courses, rooms, sharedCareerCount } from '../data/demoDataset'
import type { Course, Room } from '../domain/types'
import { coursesOverlap, validateAssignments } from '../domain/validation'

describe('generateAssignments', () => {
  it('asigna cada cuatrimestre de las seis carreras por separado y sin conflictos', () => {
    expect(careers).toHaveLength(6)
    expect(courses).toHaveLength(65)
    expect(new Set(courses.map((course) => course.id)).size).toBe(courses.length)
    expect(courses.filter((course) => course.careerId === 'informatica')).toHaveLength(12)
    expect(courses.filter((course) => course.careerId === 'civil')).toHaveLength(11)
    expect(courses.filter((course) => course.careerId === 'mecanica')).toHaveLength(8)
    expect(sharedCareerCount(courses.find((course) => course.curriculumCode === '3622')!)).toBeGreaterThan(1)
    for (const term of [1, 2] as const) {
      const termCourses = courses.filter((course) => course.term === term)
      const result = generateAssignments(rooms, termCourses)
      expect(result.unassigned).toEqual([])
      expect(result.assignments).toHaveLength(termCourses.length)
      expect(validateAssignments(rooms, termCourses, result.assignments)).toEqual([])
      for (const career of careers) {
        const planCourses = termCourses.filter((course) => course.careerId === career.id)
        for (let left = 0; left < planCourses.length; left += 1) {
          for (let right = left + 1; right < planCourses.length; right += 1) {
            expect(coursesOverlap(planCourses[left], planCourses[right]), `${career.name}: ${planCourses[left].curriculumCode} y ${planCourses[right].curriculumCode}`).toBe(false)
          }
        }
      }
    }
  })

  it('usa retroceso cuando una elección voraz deja un curso sin aula', () => {
    const testRooms: Room[] = [
      { id: 'R1', name: 'R1', capacity: 40, mapPosition: { xPercent: 0, yPercent: 0 } },
      { id: 'R2', name: 'R2', capacity: 60, mapPosition: { xPercent: 0, yPercent: 0 } },
    ]
    const makeCourse = (id: string, seats: number, startMinutes: number, endMinutes: number): Course => ({ id, name: id, subject: id, curriculumCode: id, careerId: 'test', term: 1, weeklyHours: 1, estimatedSeats: seats, enrollmentHistory: [], day: 1, startMinutes, endMinutes })
    const testCourses = [makeCourse('X', 60, 1080, 1140), makeCourse('Y', 40, 1140, 1200), makeCourse('Z', 40, 1110, 1170)]
    const result = generateAssignments(testRooms, testCourses)
    expect(result.unassigned).toEqual([])
    expect(result.assignments).toContainEqual({ courseId: 'Z', roomId: 'R1' })
    expect(result.assignments).toContainEqual({ courseId: 'X', roomId: 'R2' })
    expect(result.assignments).toContainEqual({ courseId: 'Y', roomId: 'R2' })
  })
})
