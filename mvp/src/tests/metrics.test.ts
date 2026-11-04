import { describe, expect, it } from 'vitest'
import { generateAssignments } from '../domain/allocation'
import { calculatePilotMetrics } from '../domain/metrics'
import { courses, rooms } from '../data/demoDataset'
import { initialState } from '../state/reducer'

describe('calculatePilotMetrics', () => {
  it('calcula las asignaciones conservadas sobre la propuesta completa', () => {
    const generated = generateAssignments(rooms, courses)
    const state = {
      ...initialState,
      phase: 'running' as const,
      originalAssignments: generated.assignments,
      currentAssignments: generated.assignments,
      assignmentEvidence: courses.map((course, index) => ({ courseId: course.id, everModified: index >= courses.length - 3 })),
    }
    expect(calculatePilotMetrics(state, rooms, courses).unchangedAssignmentsPercent).toBeCloseTo((courses.length - 3) / courses.length * 100)
  })

  it('no vuelve a contar como intacto un curso modificado y deshecho', () => {
    const generated = generateAssignments(rooms, courses)
    const state = {
      ...initialState,
      originalAssignments: generated.assignments,
      currentAssignments: generated.assignments,
      assignmentEvidence: courses.map((course) => ({ courseId: course.id, everModified: course.id === courses[0].id })),
    }
    expect(calculatePilotMetrics(state, rooms, courses).unchangedAssignments).toBe(courses.length - 1)
  })
})
