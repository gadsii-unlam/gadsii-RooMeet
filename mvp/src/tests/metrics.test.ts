import { describe, expect, it } from 'vitest'
import { generateAssignments } from '../domain/allocation'
import { calculatePilotMetrics } from '../domain/metrics'
import { courses, rooms } from '../data/demoDataset'
import { initialState } from '../state/reducer'

describe('calculatePilotMetrics', () => {
  it('calcula las asignaciones conservadas sin cambios sobre el cuatrimestre planificado', () => {
    const termCourses = courses.filter((course) => course.term === 1)
    const generated = generateAssignments(rooms, termCourses)
    const state = {
      ...initialState,
      phase: 'running' as const,
      originalAssignments: generated.assignments,
      currentAssignments: generated.assignments,
      planningTerm: 1 as const,
      assignmentEvidence: termCourses.map((course, index) => ({ courseId: course.id, everModified: index >= termCourses.length - 3 })),
    }
    expect(calculatePilotMetrics(state, rooms, termCourses).unchangedAssignmentsPercent).toBeCloseTo((termCourses.length - 3) / termCourses.length * 100)
  })

  it('no vuelve a contar como intacto un curso modificado y deshecho', () => {
    const termCourses = courses.filter((course) => course.term === 1)
    const generated = generateAssignments(rooms, termCourses)
    const state = {
      ...initialState,
      originalAssignments: generated.assignments,
      currentAssignments: generated.assignments,
      planningTerm: 1 as const,
      assignmentEvidence: termCourses.map((course) => ({ courseId: course.id, everModified: course.id === termCourses[0].id })),
    }
    expect(calculatePilotMetrics(state, rooms, termCourses).unchangedAssignments).toBe(termCourses.length - 1)
  })
})
