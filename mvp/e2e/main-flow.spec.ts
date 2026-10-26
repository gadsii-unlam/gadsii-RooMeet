import { expect, test } from '@playwright/test'
import { courses, getCareer, rooms } from '../src/data/demoDataset'
import { generateAssignments } from '../src/domain/allocation'
import { validateChange } from '../src/domain/validation'
import { initialState } from '../src/state/reducer'
import { STORAGE_KEY } from '../src/state/storage'

const result = generateAssignments(rooms, courses)
const state = { ...initialState, phase: 'running' as const, currentAssignments: result.assignments, originalAssignments: result.assignments }
const moves = result.assignments.flatMap((assignment) => rooms.filter((room) => validateChange(rooms, courses, state, {
  courseId: assignment.courseId,
  fromRoomId: assignment.roomId,
  toRoomId: room.id,
  expectedRevision: 0,
}).valid).map((room) => ({ assignment, room })))

async function openChange(page: import('@playwright/test').Page, move: typeof moves[number]) {
  const source = rooms.find((room) => room.id === move.assignment.roomId)!
  const course = courses.find((item) => item.id === move.assignment.courseId)!
  const career = getCareer(course.careerId)!.name
  await page.getByLabel('Cuatrimestre').selectOption(String(course.term))
  await page.getByRole('button', { name: `Ver agenda de ${source.name}` }).click()
  await page.getByLabel('Buscar en esta aula').fill(course.curriculumCode)
  await page.locator('details.agenda-course').filter({ hasText: course.subject }).filter({ hasText: career.replace(/^Ingeniería /, '') }).locator('summary').click()
  await page.getByRole('button', { name: `Cambiar aula de ${course.subject}, ${career}` }).click()
  await expect(page.getByRole('heading', { name: `Modificar ${course.name}` })).toBeVisible()
  await page.getByRole('radio', { name: new RegExp(`^${move.room.name}`) }).check({ force: true })
  return { source, course }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('genera, revisa y corrige una propuesta con feedback y deshacer', async ({ page }) => {
  const move = moves[0]
  await expect(page.getByRole('heading', { name: 'Revisá la entrada de la prueba' })).toBeVisible()
  await expect(page.getByText('65', { exact: true }).first()).toBeVisible()
  await page.getByLabel('Carrera').selectOption('mecanica')
  await expect(page.getByText('8 de 65 visibles')).toBeVisible()
  await page.getByLabel('Carrera').selectOption('all')
  await page.getByRole('button', { name: 'Generar propuesta' }).click()
  await expect(page.getByRole('heading', { name: 'Revisá la propuesta' })).toBeVisible()
  await expect(page.getByText('0/65')).toBeVisible()
  await page.getByRole('button', { name: 'Revisar aulas' }).click()
  const { source, course } = await openChange(page, move)
  await expect(page.getByRole('button', { name: 'Confirmar cambio local' })).toBeEnabled()
  await page.getByRole('button', { name: 'Confirmar cambio local' }).click()
  await expect(page.getByRole('status')).toContainText(`${course.name}: ${source.name} → ${move.room.name}`)
  await page.getByRole('button', { name: `Deshacer cambio de ${course.name}` }).click()
  await expect(page.getByRole('status')).toContainText(`se restauró ${source.name}`)
})

test('editar un curso afecta solo a ese curso', async ({ page }) => {
  const move = moves.find((candidate) => candidate.assignment.courseId !== moves[0].assignment.courseId)!
  await page.getByRole('button', { name: 'Generar propuesta' }).click()
  await page.getByRole('button', { name: 'Revisar aulas' }).click()
  const { source, course } = await openChange(page, move)
  await expect(page.getByRole('button', { name: 'Confirmar cambio local' })).toBeEnabled()
  await page.getByRole('button', { name: 'Confirmar cambio local' }).click()
  await expect(page.getByRole('status')).toContainText(`${course.name}: ${source.name} → ${move.room.name}`)
  await expect.poll(() => page.evaluate(({ key, courseId }) => {
    const saved = JSON.parse(localStorage.getItem(key)!) as { currentAssignments: typeof result.assignments }
    return saved.currentAssignments.find((item) => item.courseId === courseId)?.roomId
  }, { key: STORAGE_KEY, courseId: course.id })).toBe(move.room.id)
  const payload = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!) as { currentAssignments: typeof result.assignments }, STORAGE_KEY)
  for (const original of result.assignments) {
    const current = payload.currentAssignments.find((item) => item.courseId === original.courseId)!
    expect(current.roomId).toBe(original.courseId === course.id ? move.room.id : original.roomId)
  }
})
