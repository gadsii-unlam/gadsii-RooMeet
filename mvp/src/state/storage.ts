import { courses, DATASET_VERSION, rooms } from '../data/demoDataset'
import type { SessionState } from '../domain/types'
import { validateAssignments } from '../domain/validation'

const OLD_STORAGE_KEYS = ['roomeet:mvp:session:v1', 'roomeet:mvp:session:v2', 'roomeet:mvp:session:v3']
export const STORAGE_KEY = 'roomeet:mvp:session:v4'

export interface StorageLoadResult {
  state: SessionState | null
  error: string | null
}

function looksLikeState(value: unknown): value is SessionState {
  if (!value || typeof value !== 'object') return false
  const state = value as Partial<SessionState>
  return state.schemaVersion === 3
    && state.datasetVersion === DATASET_VERSION
    && typeof state.sessionId === 'string'
    && typeof state.revision === 'number'
    && ['not-started', 'running', 'finished'].includes(state.phase ?? '')
    && (state.planningTerm === 1 || state.planningTerm === 2)
    && Array.isArray(state.originalAssignments)
    && Array.isArray(state.currentAssignments)
    && Array.isArray(state.unassigned)
    && Array.isArray(state.assignmentEvidence)
    && Array.isArray(state.events)
}

export function loadSession(): StorageLoadResult {
  try {
    OLD_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
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
    OLD_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
  } catch {
    // El estado en memoria se reinicia igualmente.
  }
}
