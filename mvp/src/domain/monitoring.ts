import type { Course, Day } from './types'

export interface MonitorFilters {
  day: Day | 0
  slot: string
}

export const defaultMonitorFilters: MonitorFilters = { day: 0, slot: 'all' }

export const AGENDA_PAGE_SIZE = 3

export const DAY_OPTIONS: Array<{ value: Day | 0; label: string }> = [
  { value: 0, label: 'Todos los días' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
]

export const SLOT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'Día completo' },
  { value: '480-720', label: '08:00–12:00' },
  { value: '720-960', label: '12:00–16:00' },
  { value: '960-1200', label: '16:00–20:00' },
  { value: '1200-1440', label: '20:00–24:00' },
]

export function dayLabel(day: Day | 0): string {
  return DAY_OPTIONS.find((option) => option.value === day)?.label ?? ''
}

function slotRange(slot: string): [number, number] | null {
  if (slot === 'all') return null
  const [start, end] = slot.split('-').map(Number)
  return [start, end]
}

// La disponibilidad en una franja solo se afirma con un día y una franja concretos.
export function hasTimeWindow(filters: MonitorFilters): boolean {
  return filters.day !== 0 && filters.slot !== 'all'
}

export function matchesFilters(course: Course, filters: MonitorFilters): boolean {
  if (filters.day !== 0 && course.day !== filters.day) return false
  const range = slotRange(filters.slot)
  return !range || (course.startMinutes < range[1] && range[0] < course.endMinutes)
}

export function describeFilters(filters: MonitorFilters): string {
  const slot = filters.slot === 'all' ? 'día completo' : SLOT_OPTIONS.find((option) => option.value === filters.slot)?.label ?? filters.slot
  return `${dayLabel(filters.day)} · ${slot}`
}

export function describeOccupancy(count: number, filters: MonitorFilters): string {
  if (hasTimeWindow(filters)) return count ? 'Ocupada en la franja' : 'Libre en la franja'
  return count ? `${count} ${count === 1 ? 'curso' : 'cursos'}` : 'Sin cursos'
}

export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

export function matchesQuery(course: Course, careerName: string, query: string): boolean {
  const needle = normalizeText(query.trim())
  return !needle || normalizeText(`${course.subject} ${course.curriculumCode} ${careerName}`).includes(needle)
}

export function compareBySchedule(a: Course, b: Course): number {
  return a.day - b.day || a.startMinutes - b.startMinutes || a.subject.localeCompare(b.subject, 'es')
}
