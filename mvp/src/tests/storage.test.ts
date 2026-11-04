import { beforeEach, describe, expect, it } from 'vitest'
import { loadSession, STORAGE_KEY } from '../state/storage'

describe('persistencia de la sesión', () => {
  beforeEach(() => localStorage.clear())

  it('descarta silenciosamente una sesión de otra versión del dataset', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ datasetVersion: 'dataset-anterior' }))

    expect(loadSession()).toEqual({ state: null, error: null })
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('mantiene la advertencia para contenido realmente dañado', () => {
    localStorage.setItem(STORAGE_KEY, '{contenido-invalido')

    expect(loadSession()).toEqual({
      state: null,
      error: 'No se pudo leer la sesión guardada. Podés iniciar una prueba nueva.',
    })
  })
})
