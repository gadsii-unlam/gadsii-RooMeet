import { courses, DATASET_VERSION, rooms } from '../data/demoDataset'
import type { SessionState } from '../domain/types'
import { validateAssignments } from '../domain/validation'

const OLD_STORAGE_KEY = 'roomeet:mvp:session:v1'
export const STORAGE_KEY = 'roomeet:mvp:session:v2'

export interface StorageLoadResult {
  state: SessionState | null
  error: string | null
}

function looksLikeState(value: unknown): value is SessionState {
  if (!value || typeof value !== 'object') return false
  const state = value as Partial<SessionState>
  return state.schemaVersion === 1
    && state.datasetVersion === DATASET_VERSION
    && typeof state.sessionId === 'string'
    && typeof state.revision === 'number'
    && ['not-started', 'running', 'finished'].includes(state.phase ?? '')
    && Array.isArray(state.originalAssignments)
    && Array.isArray(state.currentAssignments)
    && Array.isArray(state.unassigned)
    && Array.isArray(state.reviews)
    && Array.isArray(state.events)
}

export function loadSession(): StorageLoadResult {
  try {
    // El usuario pidió quitar los datos de prueba anteriores (cursos A–J).
    localStorage.removeItem(OLD_STORAGE_KEY)
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { state: null, error: null }
    const parsed: unknown = JSON.parse(raw)
    if (!looksLikeState(parsed)) return { state: null, error: 'La sesión guardada es incompatible o está dañada.' }
    const violations = validateAssignments(rooms, courses, parsed.currentAssignments)
    if (violations.length > 0) return { state: null, error: 'La sesión guardada contiene asignaciones inválidas.' }
    return { state: parsed, error: null }
  } catch {
    return { state: null, error: 'No se pudo leer la sesión guardada. Podés iniciar una prueba nueva.' }
  }
}

export function saveSession(state: SessionState): string | null {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return null
  } catch {
    return 'El navegador no permite guardar esta sesión. Los cambios durarán mientras esta pestaña siga abierta.'
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(OLD_STORAGE_KEY)
  } catch {
    // El estado en memoria se reinicia igualmente.
  }
}
