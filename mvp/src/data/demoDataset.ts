import type { Course, Day, Room, Term } from '../domain/types'

export const DATASET_VERSION = 'roomeet-diit-primer-anio-2026-10-v2'

export interface Career {
  id: string
  name: string
  plan: string
  sourceUrl: string
}

export const careers: Career[] = [
  { id: 'informatica', name: 'Ingeniería Informática', plan: '2023', sourceUrl: 'https://ingenieria.unlam.edu.ar/index.php?idArticulo=565&seccion=3' },
  { id: 'electronica', name: 'Ingeniería Electrónica', plan: '2023', sourceUrl: 'https://ingenieria.unlam.edu.ar/index.php?idArticulo=566&seccion=3' },
  { id: 'industrial', name: 'Ingeniería Industrial', plan: '2024', sourceUrl: 'https://ingenieria.unlam.edu.ar/index.php?idArticulo=700&seccion=3' },
  { id: 'civil', name: 'Ingeniería Civil', plan: '2025', sourceUrl: 'https://ingenieria.unlam.edu.ar/index.php?idArticulo=702&seccion=3' },
  { id: 'mecanica', name: 'Ingeniería Mecánica', plan: '2015', sourceUrl: 'https://ingenieria.unlam.edu.ar/index.php?idArticulo=488&seccion=3' },
  { id: 'arquitectura', name: 'Arquitectura', plan: '2015', sourceUrl: 'https://ingenieria.unlam.edu.ar/index.php?idArticulo=441&seccion=3' },
]

export const rooms: Room[] = [
  { id: 'room-1', name: 'Aula 1', capacity: 40, mapPosition: { xPercent: 42, yPercent: 62 } },
  { id: 'room-2', name: 'Aula 2', capacity: 60, mapPosition: { xPercent: 56, yPercent: 45 } },
  { id: 'room-3', name: 'Aula 3', capacity: 50, mapPosition: { xPercent: 70, yPercent: 71 } },
]

type SubjectSeed = readonly [code: string, title: string, weeklyHours: number]
type CareerPlan = { careerId: string; first: SubjectSeed[]; second: SubjectSeed[] }

const plans: CareerPlan[] = [
  { careerId: 'informatica', first: [
    ['3621', 'Matemática Discreta', 4], ['3622', 'Análisis Matemático I', 4],
    ['3623', 'Programación Inicial', 4], ['3624', 'Introducción a los Sistemas de Información', 4],
    ['3625', 'Sistemas de Numeración', 4], ['3626', 'Principios de Calidad de Software', 4],
  ], second: [
    ['3627', 'Álgebra y Geometría Analítica I', 4], ['3628', 'Física I', 4],
    ['3629', 'Programación Estructurada Básica', 4], ['3630', 'Introducción a la Gestión de Requisitos', 4],
    ['3631', 'Fundamentos de Sistemas Embebidos', 4], ['3632', 'Introducción a Proyectos Informáticos', 4],
  ] },
  { careerId: 'electronica', first: [
    ['3681', 'Análisis Matemático I', 4], ['3682', 'Álgebra y Geometría Analítica I', 4],
    ['3683', 'Fundamentos de Química', 4], ['3684', 'Física I', 4],
    ['3685', 'Integración Tecnológica I', 4], ['3686', 'Tecnología, Ingeniería y Sociedad', 4],
  ], second: [
    ['3687', 'Análisis Matemático II', 4], ['3688', 'Álgebra y Geometría Analítica II', 4],
    ['3689', 'Elementos de Programación', 4], ['3690', 'Física II', 4],
    ['3691', 'Sistemas de Representación', 4], ['3692', 'Técnicas Digitales I', 4],
  ] },
  { careerId: 'industrial', first: [
    ['4052', 'Análisis Matemático I', 4], ['4053', 'Infraestructura Tecnológica', 4],
    ['4054', 'Álgebra y Geometría Analítica I', 4], ['4055', 'Física I', 4],
    ['4056', 'Sistemas de Representación', 4], ['4057', 'Introducción al Ejercicio Profesional', 4],
  ], second: [
    ['4058', 'Elementos de Economía', 4], ['4059', 'Análisis Matemático II', 4],
    ['4060', 'Física II', 4], ['4061', 'Fundamentos de Química', 4],
    ['4062', 'Álgebra y Geometría Analítica II', 4], ['4063', 'Organización Industrial I', 4],
  ] },
  { careerId: 'civil', first: [
    ['4121', 'Álgebra y Geometría Analítica I', 4], ['4122', 'Análisis Matemático I', 4],
    ['4123', 'Física I', 4], ['4124', 'Introducción a la Ingeniería Civil', 4],
    ['4125', 'Sistemas Gráficos 2D y 3D', 4], ['4126', 'Fundamentos de Química', 4],
  ], second: [
    ['4127', 'Álgebra y Geometría Analítica II', 4], ['4128', 'Análisis Matemático II', 4],
    ['4129', 'Estática de las Estructuras I', 4], ['4130', 'Geotopografía', 6],
    ['4131', 'Innovación en Materiales de Construcción', 4],
  ] },
  { careerId: 'mecanica', first: [
    ['1023', 'Análisis Matemático I', 8], ['1024', 'Elementos de Programación', 8],
    ['1027', 'Álgebra y Geometría Analítica I', 8],
  ], second: [
    ['1026', 'Tecnología, Ingeniería y Sociedad', 4], ['1025', 'Sistemas de Representación', 4],
    ['1028', 'Matemática Discreta', 4], ['1029', 'Química General', 4],
    ['1030', 'Fundamentos de TICs', 8],
  ] },
  { careerId: 'arquitectura', first: [
    ['2952', 'Proyecto I', 8], ['2953', 'Tecnología I', 4], ['2954', 'Forma I', 4],
    ['2955', 'Historia y Crítica I', 4], ['2956', 'Matemática Aplicada I', 4],
  ], second: [
    ['2957', 'Proyecto II', 8], ['2958', 'Tecnología II', 4], ['2959', 'Forma II', 4],
    ['2960', 'Historia y Crítica II', 4], ['2961', 'Matemática Aplicada II', 4],
  ] },
]

// Los planes aportan materias y horas semanales. Cada curso tiene una única reunión
// continua ficticia, con cupo e historial simulados, para probar la asignación.
const SEAT_BASE: Record<string, number> = {
  informatica: 44, electronica: 37, industrial: 43,
  civil: 35, mecanica: 33, arquitectura: 29,
}

const LONG_SLOTS: Record<string, { day: Day; startMinutes: number }> = {
  '1023': { day: 1, startMinutes: 480 },
  '1024': { day: 2, startMinutes: 480 },
  '1027': { day: 3, startMinutes: 480 },
  '2952': { day: 5, startMinutes: 480 },
  '2957': { day: 1, startMinutes: 480 },
  '1030': { day: 5, startMinutes: 480 },
  '4130': { day: 5, startMinutes: 960 },
}

function makeCourse(careerId: string, term: Term, seed: SubjectSeed, index: number): Course {
  const [curriculumCode, subject, weeklyHours] = seed
  const estimatedSeats = curriculumCode === '3622' || curriculumCode === '3627'
    ? 54
    : Math.min(50, SEAT_BASE[careerId] + (index % 3) - 1)
  return {
    id: `${careerId}-${curriculumCode}`,
    name: `Curso ${curriculumCode}`,
    subject,
    curriculumCode,
    careerId,
    term,
    weeklyHours,
    estimatedSeats,
    enrollmentHistory: [estimatedSeats - 5, estimatedSeats - 2],
    day: 1,
    startMinutes: 480,
    endMinutes: 480 + weeklyHours * 60,
  }
}

function buildTerm(term: Term): Course[] {
  const byCareer = plans.map((plan) => ({
    careerId: plan.careerId,
    items: (term === 1 ? plan.first : plan.second).map((seed, index) => makeCourse(plan.careerId, term, seed, index)),
  }))
  const regular: Course[] = []
  const long: Course[] = []
  const rounds = Math.max(...byCareer.map((entry) => entry.items.length))
  for (let index = 0; index < rounds; index += 1) {
    for (const entry of byCareer) {
      const course = entry.items[index]
      if (course) (course.weeklyHours === 4 ? regular : long).push(course)
    }
  }
  const scheduledRegular = regular.map((course, index) => {
    // Dos cursos por franja dejan un aula libre para los bloques largos.
    const slot = Math.floor(index / 2)
    const day = (Math.floor(slot / 3) + 1) as Day
    const startMinutes = 480 + (slot % 3) * 240
    return { ...course, day, startMinutes, endMinutes: startMinutes + 240 }
  })
  const scheduledLong = long.map((course) => {
    const slot = LONG_SLOTS[course.curriculumCode]
    if (!slot) throw new Error(`Falta un horario de prueba para la materia ${course.curriculumCode}.`)
    return { ...course, day: slot.day, startMinutes: slot.startMinutes, endMinutes: slot.startMinutes + course.weeklyHours * 60 }
  })
  return [...scheduledRegular, ...scheduledLong]
}

export const courses: Course[] = [...buildTerm(1), ...buildTerm(2)]

const careerCountBySubject = new Map<string, Set<string>>()
for (const course of courses) {
  const key = course.subject.toLocaleLowerCase('es-AR')
  const careerIds = careerCountBySubject.get(key) ?? new Set<string>()
  careerIds.add(course.careerId)
  careerCountBySubject.set(key, careerIds)
}

export function sharedCareerCount(course: Course): number {
  return careerCountBySubject.get(course.subject.toLocaleLowerCase('es-AR'))?.size ?? 1
}

export function getCareer(careerId: string): Career | undefined {
  return careers.find((career) => career.id === careerId)
}

const DAY_NAMES: Record<number, string> = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes' }

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60).toString().padStart(2, '0')
  const mins = (minutes % 60).toString().padStart(2, '0')
  return `${hours}:${mins}`
}

export function formatTimeRange(course: Course): string {
  return `${formatMinutes(course.startMinutes)}–${formatMinutes(course.endMinutes)}`
}

export function formatCourseSchedule(course: Course): string {
  return `${course.term}.º cuatrimestre · ${DAY_NAMES[course.day]} ${formatTimeRange(course)}`
}

export function getCourse(courseId: string): Course | undefined {
  return courses.find((course) => course.id === courseId)
}

export function getRoom(roomId: string): Room | undefined {
  return rooms.find((room) => room.id === roomId)
}
