import { describe, expect, it } from 'vitest'
import { generateAssignments } from '../domain/allocation'
import { calculatePilotMetrics } from '../domain/metrics'
import { courses, rooms } from '../data/demoDataset'
import { initialState } from '../state/reducer'

describe('calculatePilotMetrics', () => {
  it('calcula la aprobación sobre los 65 cursos de entrada', () => {
    const generated = generateAssignments(rooms, courses)
    const state = {
      ...initialState,
      phase: 'running' as const,
      originalAssignments: generated.assignments,
      currentAssignments: generated.assignments,
      reviews: courses.map((course, index) => ({ courseId: course.id, approved: index < 59, everModified: false })),
    }
    expect(calculatePilotMetrics(state, rooms, courses).approvedWithoutChangesPercent).toBeCloseTo(59 / 65 * 100)
  })

  it('no vuelve a contar como intacto un curso modificado y deshecho', () => {
    const generated = generateAssignments(rooms, courses)
    const state = {
      ...initialState,
      originalAssignments: generated.assignments,
      currentAssignments: generated.assignments,
      reviews: courses.map((course) => ({ courseId: course.id, approved: true, everModified: course.id === courses[0].id })),
    }
    expect(calculatePilotMetrics(state, rooms, courses).approvedWithoutChanges).toBe(64)
  })
})
