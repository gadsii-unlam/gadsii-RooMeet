import Clarity from '@microsoft/clarity'

/**
 * Grabación de sesiones y heatmaps con Microsoft Clarity, solo durante pruebas moderadas.
 *
 * Clarity se carga únicamente si el build tiene VITE_CLARITY_ID y la pestaña se abrió con
 * `?grabar=1` (opcionalmente `&tipo=piloto|usabilidad&p=P03`). Sin eso no se descarga ningún
 * script externo. Cualquier error (por ejemplo, un bloqueador de anuncios) se ignora para que
 * la prueba siga funcionando igual.
 */

export type RecordingType = 'piloto' | 'usabilidad'

export interface RecordingConfig {
  tipo: RecordingType
  participante: string
}

export type RecordingEvent =
  | 'generar-propuesta'
  | 'abrir-cambio'
  | 'cambio-cancelado'
  | 'cambio-rechazado'
  | 'cambio-confirmado'
  | 'deshacer'
  | 'deshacer-fallido'
  | 'finalizar'
  | 'finalizar-bloqueado'
  | 'exportar'
  | 'nueva-prueba'
  | 'valoracion-enviada'

const STORAGE_KEY = 'roomeet:grabacion:v1'
const participantPattern = /^[A-Za-z0-9_-]{1,20}$/
const excludedPaths = ['/resumen-estadisticas']

let active = false
let config: RecordingConfig | null = null
let lastSessionId = ''

function readStored(storage: Storage): RecordingConfig | null {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null')
    if (!parsed || typeof parsed !== 'object') return null
    const { tipo, participante } = parsed as Partial<RecordingConfig>
    if ((tipo !== 'piloto' && tipo !== 'usabilidad') || typeof participante !== 'string') return null
    return { tipo, participante }
  } catch {
    return null
  }
}

/**
 * Lee los parámetros de la URL y los recuerda para la pestaña. `?grabar=0` desactiva la grabación.
 * Devuelve `changedUrl` cuando hay parámetros que conviene quitar de la barra de direcciones.
 */
export function resolveRecordingConfig(search: string, storage: Storage): { config: RecordingConfig | null, changedUrl: boolean } {
  const params = new URLSearchParams(search)
  const flag = params.get('grabar')
  if (flag === null) return { config: readStored(storage), changedUrl: false }
  if (flag !== '1') {
    try { storage.removeItem(STORAGE_KEY) } catch { /* Sin almacenamiento no hay nada que borrar. */ }
    return { config: null, changedUrl: true }
  }
  const tipo: RecordingType = params.get('tipo') === 'usabilidad' ? 'usabilidad' : 'piloto'
  const rawParticipant = params.get('p') ?? ''
  const participante = participantPattern.test(rawParticipant) ? rawParticipant : 'sin-codigo'
  const next = { tipo, participante }
  try { storage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* Se usa solo para esta carga. */ }
  return { config: next, changedUrl: true }
}

function cleanUrl(): void {
  const url = new URL(window.location.href)
  for (const key of ['grabar', 'tipo', 'p']) url.searchParams.delete(key)
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}

export function initRecording(projectId = import.meta.env.VITE_CLARITY_ID, isDev = import.meta.env.DEV): boolean {
  if (active) return true
  try {
    const resolved = resolveRecordingConfig(window.location.search, window.sessionStorage)
    if (resolved.changedUrl) cleanUrl()
    if (isDev || !projectId || !resolved.config) return false
    if (excludedPaths.includes(window.location.pathname)) return false
    config = resolved.config
    Clarity.init(projectId)
    // El consentimiento se pide en persona antes de entregar el enlace con ?grabar=1.
    Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' })
    Clarity.upgrade('prueba-roomeet')
    Clarity.setTag('tipo', config.tipo)
    Clarity.setTag('participante', config.participante)
    active = true
  } catch {
    active = false
  }
  return active
}

export function isRecording(): boolean {
  return active
}

/** Asocia la grabación al ID anónimo de la prueba (el mismo que se guarda en Neon y en el JSON exportado). */
export function identifySession(sessionId: string, screen?: string): void {
  if (!active || !sessionId) return
  try {
    Clarity.identify(sessionId, undefined, screen, config?.participante)
    if (sessionId !== lastSessionId) {
      Clarity.setTag('roomeet_session', sessionId)
      lastSessionId = sessionId
    }
  } catch { /* La grabación nunca interrumpe la prueba. */ }
}

export function trackScreen(screen: string, sessionId: string): void {
  if (!active) return
  try {
    Clarity.event(`pantalla-${screen}`)
    if (sessionId) identifySession(sessionId, screen)
  } catch { /* La grabación nunca interrumpe la prueba. */ }
}

export function trackEvent(name: RecordingEvent): void {
  if (!active) return
  try { Clarity.event(name) } catch { /* La grabación nunca interrumpe la prueba. */ }
}

/** Solo para tests. */
export function resetRecordingForTests(): void {
  active = false
  config = null
  lastSessionId = ''
}
