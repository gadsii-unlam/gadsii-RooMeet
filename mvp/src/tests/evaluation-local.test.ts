import { beforeEach, describe, expect, it } from 'vitest'
import { loadEvaluations, recordFinish, recordRating, recordStart } from '../evaluationApi'

describe('registro local de evaluación', () => {
  beforeEach(() => localStorage.clear())

  it('conserva inicio, duración, cambios y valoración de una prueba', async () => {
    const id = 'session-00000000-0000-0000-0000-000000000001'
    await recordStart(id, 'dataset-test', '2026-11-04T10:00:00.000Z')
    await recordStart(id, 'dataset-test', '2026-11-04T10:01:00.000Z')
    await recordFinish(id, 2, '2026-11-04T10:05:00.000Z')
    await recordRating(id, 4, 'Fue claro')
    const rows = await loadEvaluations('')
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({ duration_seconds: 300, changes: 2, rating: 4, comment: 'Fue claro' })
  })
})
