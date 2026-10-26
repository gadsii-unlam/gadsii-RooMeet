import { describe, expect, it } from 'vitest'
import { compareBySchedule, defaultMonitorFilters, describeFilters, describeOccupancy, matchesFilters, matchesQuery } from '../domain/monitoring'
import type { Course } from '../domain/types'

function course(overrides: Partial<Course>): Course {
  return {
    id: 'c', name: 'Curso c', subject: 'Análisis Matemático I', curriculumCode: '3622', careerId: 'informatica',
    term: 1, weeklyHours: 4, estimatedSeats: 40, enrollmentHistory: [], day: 1, startMinutes: 480, endMinutes: 720,
    ...overrides,
  }
}

describe('filtros del monitoreo', () => {
  it('separa los cuatrimestres y filtra por día', () => {
    expect(matchesFilters(course({ term: 2 }), defaultMonitorFilters)).toBe(false)
    expect(matchesFilters(course({ day: 3 }), { ...defaultMonitorFilters, day: 3 })).toBe(true)
    expect(matchesFilters(course({ day: 3 }), { ...defaultMonitorFilters, day: 2 })).toBe(false)
  })

  it('calcula la franja por intersección y acepta bordes consecutivos', () => {
    const filters = { term: 1 as const, day: 1 as const, slot: '720-960' }
    expect(matchesFilters(course({ startMinutes: 480, endMinutes: 720 }), filters)).toBe(false)
    expect(matchesFilters(course({ startMinutes: 600, endMinutes: 780 }), filters)).toBe(true)
  })

  it('solo afirma disponibilidad con un día y una franja concretos', () => {
    expect(describeOccupancy(0, defaultMonitorFilters)).toBe('Sin cursos')
    expect(describeOccupancy(2, { ...defaultMonitorFilters, slot: '480-720' })).toBe('2 cursos')
    expect(describeOccupancy(1, { term: 1, day: 1, slot: '480-720' })).toBe('Ocupada en la franja')
    expect(describeOccupancy(0, { term: 1, day: 1, slot: '480-720' })).toBe('Libre en la franja')
  })

  it('describe el alcance del filtro', () => {
    expect(describeFilters(defaultMonitorFilters)).toBe('1.º cuatrimestre · Todos los días · día completo')
    expect(describeFilters({ term: 2, day: 4, slot: '960-1200' })).toBe('2.º cuatrimestre · Jueves · 16:00–20:00')
  })
})

describe('agenda del aula', () => {
  it('busca por materia, código o carrera sin distinguir acentos', () => {
    const item = course({})
    expect(matchesQuery(item, 'Ingeniería Informática', 'analisis')).toBe(true)
    expect(matchesQuery(item, 'Ingeniería Informática', '3622')).toBe(true)
    expect(matchesQuery(item, 'Ingeniería Informática', 'informatica')).toBe(true)
    expect(matchesQuery(item, 'Ingeniería Informática', 'civil')).toBe(false)
    expect(matchesQuery(item, 'Ingeniería Informática', '  ')).toBe(true)
  })

  it('ordena por día, hora y materia', () => {
    const items = [course({ id: 'b', day: 2 }), course({ id: 'c', day: 1, startMinutes: 720, endMinutes: 960 }), course({ id: 'a', day: 1 })]
    expect(items.sort(compareBySchedule).map((item) => item.id)).toEqual(['a', 'c', 'b'])
  })
})
