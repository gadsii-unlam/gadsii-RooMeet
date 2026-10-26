import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { StepNavigation } from './components/StepNavigation'
import { careers, courses, DATASET_VERSION, formatCourseSchedule, getCourse, getRoom, rooms } from './data/demoDataset'
import { generateAssignments } from './domain/allocation'
import { calculatePilotMetrics } from './domain/metrics'
import type { Screen, SessionState } from './domain/types'
import { validateAssignments, validateChange } from './domain/validation'
import { ChangeScreen } from './screens/ChangeScreen'
import { DataScreen } from './screens/DataScreen'
import { MonitoringScreen } from './screens/MonitoringScreen'
import { ProposalScreen } from './screens/ProposalScreen'
import { initialState, sessionReducer } from './state/reducer'
import { clearSession, loadSession, saveSession } from './state/storage'

function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`
}

function now(): string {
  return new Date().toISOString()
}

function screenFromHash(): Screen {
  const value = window.location.hash.replace('#', '')
  return ['datos', 'propuesta', 'monitoreo', 'cambio'].includes(value) ? value as Screen : 'datos'
}

function restoreInitialState(): SessionState {
  const loaded = loadSession()
  if (loaded.state) return loaded.state
  return loaded.error ? { ...initialState, errorMessage: loaded.error } : initialState
}

export default function App() {
  const [state, dispatch] = useReducer(sessionReducer, undefined, restoreInitialState)
  const [screen, setScreen] = useState<Screen>(screenFromHash)
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id)
  const [selectedScheduleKey, setSelectedScheduleKey] = useState('all')
  const [destinationId, setDestinationId] = useState('')
  const storageWarningShown = useRef(false)
  const activeScreen: Screen = state.phase === 'not-started' && screen !== 'datos'
    ? 'datos'
    : screen === 'cambio' && !state.editContext
      ? 'monitoreo'
      : screen

  const navigate = (next: Screen) => {
    let safe = next
    if (state.phase === 'not-started' && next !== 'datos') safe = 'datos'
    if (next === 'cambio' && !state.editContext) safe = state.phase === 'not-started' ? 'datos' : 'monitoreo'
    window.location.hash = safe
    setScreen(safe)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onHashChange = () => setScreen(screenFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (state.phase === 'not-started') return
    const warning = saveSession(state)
    if (warning && !storageWarningShown.current) {
      storageWarningShown.current = true
      dispatch({ type: 'SET_STORAGE_WARNING', message: warning })
    }
  }, [state])

  const metrics = useMemo(() => calculatePilotMetrics(state, rooms, courses), [state])
  const currentViolations = useMemo(() => validateAssignments(rooms, courses, state.currentAssignments), [state.currentAssignments])
  const canFinish = state.phase === 'running'
    && state.currentAssignments.length === courses.length
    && state.unassigned.length === 0
    && state.reviews.length === courses.length
    && state.reviews.every((review) => review.approved)
    && currentViolations.length === 0

  const generate = () => {
    try {
      const result = generateAssignments(rooms, courses)
      dispatch({ type: 'GENERATE', result, sessionId: uid('session'), now: now(), eventId: uid('event') })
      window.location.hash = 'propuesta'
      setScreen('propuesta')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: error instanceof Error ? error.message : 'No se pudo generar la propuesta.' })
    }
  }

  const openEdit = (courseId: string, roomId: string) => {
    dispatch({ type: 'OPEN_EDIT', courseId, fromRoomId: roomId })
    setDestinationId('')
    window.location.hash = 'cambio'
    setScreen('cambio')
  }

  const getDestinationValidation = (roomId: string) => {
    if (!state.editContext) return { valid: false, violations: [] }
    return validateChange(rooms, courses, state, { ...state.editContext, toRoomId: roomId })
  }

  const confirmChange = () => {
    if (!state.editContext || !destinationId) return
    const validation = getDestinationValidation(destinationId)
    if (!validation.valid) {
      const reason = validation.violations.map((violation) => violation.message).join(' ')
      dispatch({ type: 'REJECT_CHANGE', courseId: state.editContext.courseId, fromRoomId: state.editContext.fromRoomId, toRoomId: destinationId, reason, now: now(), eventId: uid('event') })
      return
    }
    const course = getCourse(state.editContext.courseId)!
    const change = {
      id: uid('change'),
      courseId: course.id,
      fromRoomId: state.editContext.fromRoomId,
      toRoomId: destinationId,
      revisionAfter: state.revision + 1,
    }
    const message = `${course.name}: ${getRoom(change.fromRoomId)?.name ?? change.fromRoomId} → ${getRoom(change.toRoomId)?.name ?? change.toRoomId} · ${formatCourseSchedule(course)}. Cambio local aplicado.`
    dispatch({
      type: 'APPLY_CHANGE',
      courseId: course.id,
      fromRoomId: state.editContext.fromRoomId,
      toRoomId: destinationId,
      changeId: change.id,
      message,
      now: now(),
      eventId: uid('event'),
    })
    setSelectedRoomId(destinationId)
    setDestinationId('')
    navigate('monitoreo')
  }

  const undo = () => {
    const change = state.lastChange
    if (!change) return
    const current = state.currentAssignments.find((assignment) => assignment.courseId === change.courseId)
    if (state.revision !== change.revisionAfter || current?.roomId !== change.toRoomId) {
      dispatch({ type: 'SET_ERROR', message: 'El cambio ya no es el último estado revisado y no se puede deshacer de forma segura.' })
      return
    }
    const restored = state.currentAssignments.map((assignment) => assignment.courseId === change.courseId ? { ...assignment, roomId: change.fromRoomId } : assignment)
    const violations = validateAssignments(rooms, courses, restored).filter((violation) => violation.courseIds.includes(change.courseId))
    if (violations.length > 0) {
      dispatch({ type: 'SET_ERROR', message: `No se pudo restaurar el aula anterior: ${violations.map((item) => item.message).join(' ')}` })
      return
    }
    const course = getCourse(change.courseId)!
    dispatch({ type: 'UNDO_CHANGE', message: `${course.name}: se restauró ${getRoom(change.fromRoomId)?.name}. ${formatCourseSchedule(course)}.`, now: now(), eventId: uid('event') })
    setSelectedRoomId(change.fromRoomId)
  }

  const finish = () => {
    if (!canFinish) {
      dispatch({ type: 'SET_ERROR', message: 'Todavía hay cursos pendientes, sin asignar o con conflictos.' })
      return
    }
    dispatch({ type: 'FINISH', message: 'Revisión finalizada. La sesión quedó disponible para consulta y exportación.', now: now(), eventId: uid('event') })
  }

  const exportSession = () => {
    const payload = {
      app: 'RooMeet MVP',
      exportedAt: now(),
      schemaVersion: state.schemaVersion,
      datasetVersion: DATASET_VERSION,
      sessionId: state.sessionId,
      phase: state.phase,
      dataset: { careers, rooms, courses },
      originalAssignments: state.originalAssignments,
      finalAssignments: state.currentAssignments,
      unassigned: state.unassigned,
      reviews: state.reviews,
      events: state.events,
      startedAt: state.startedAt,
      finishedAt: state.finishedAt,
      metrics,
      note: 'Resultados de una prueba local. No constituyen validación institucional ni integración con SIU Guaraní.',
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `roomeet-prueba-${state.sessionId || 'sin-iniciar'}.json`
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }

  const newSession = () => {
    const confirmed = state.phase === 'not-started' || window.confirm('Se eliminará la sesión local actual. Si necesitás conservarla, cancelá y exportala primero. ¿Iniciar una prueba nueva?')
    if (!confirmed) return
    clearSession()
    dispatch({ type: 'NEW_SESSION' })
    setSelectedRoomId(rooms[0].id)
    setSelectedScheduleKey('all')
    setDestinationId('')
    navigate('datos')
  }

  const cancelEdit = () => {
    dispatch({ type: 'CANCEL_EDIT' })
    setDestinationId('')
    navigate('monitoreo')
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <header className="app-header"><button className="brand" onClick={() => navigate('datos')} aria-label="Ir a los datos de RooMeet"><span className="brand-mark">R</span><span><strong>RooMeet</strong><small>Revisión segura de aulas</small></span></button><StepNavigation screen={activeScreen} phase={state.phase} onNavigate={navigate} /></header>
      {(state.storageWarning || state.errorMessage) && <div className={`global-message ${state.errorMessage ? 'error' : 'warning'}`} role="alert"><span>{state.errorMessage ?? state.storageWarning}</span><button aria-label="Cerrar mensaje" onClick={() => dispatch({ type: 'CLEAR_STATUS' })}>×</button></div>}
      {activeScreen === 'datos' && <DataScreen rooms={rooms} courses={courses} phase={state.phase} onGenerate={generate} onContinue={() => navigate('propuesta')} />}
      {activeScreen === 'propuesta' && <ProposalScreen rooms={rooms} courses={courses} assignments={state.currentAssignments} unassigned={state.unassigned} reviews={state.reviews} phase={state.phase} onApproval={(courseId, approved) => dispatch({ type: 'SET_APPROVAL', courseId, approved, now: now(), eventId: uid('event') })} onContinue={() => navigate('monitoreo')} />}
      {activeScreen === 'monitoreo' && <MonitoringScreen rooms={rooms} courses={courses} assignments={state.currentAssignments} reviews={state.reviews} phase={state.phase} selectedRoomId={selectedRoomId} selectedScheduleKey={selectedScheduleKey} lastChange={state.lastChange} statusMessage={state.statusMessage} metrics={metrics} canFinish={canFinish} onSelectRoom={setSelectedRoomId} onSelectSchedule={setSelectedScheduleKey} onEdit={openEdit} onUndo={undo} onFinish={finish} onExport={exportSession} onNew={newSession} />}
      {activeScreen === 'cambio' && state.editContext && <ChangeScreen rooms={rooms} courses={courses} assignments={state.currentAssignments} context={state.editContext} destinationId={destinationId} getValidation={getDestinationValidation} onDestination={setDestinationId} onConfirm={confirmChange} onCancel={cancelEdit} />}
      <footer><span>RooMeet MVP · Planes DIIT, cursadas simuladas</span><span>Sin conexión con SIU Guaraní</span></footer>
    </div>
  )
}
