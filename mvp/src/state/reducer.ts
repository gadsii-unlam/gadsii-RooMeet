import { DATASET_VERSION } from '../data/demoDataset'
import type { AllocationResult, SessionEvent, SessionState } from '../domain/types'

export const initialState: SessionState = {
  schemaVersion: 3,
  datasetVersion: DATASET_VERSION,
  sessionId: '',
  revision: 0,
  phase: 'not-started',
  planningTerm: null,
  originalAssignments: [],
  currentAssignments: [],
  unassigned: [],
  assignmentEvidence: [],
  lastChange: null,
  editContext: null,
  events: [],
  startedAt: null,
  finishedAt: null,
  statusMessage: null,
  errorMessage: null,
  storageWarning: null,
}

type Timed = { now: string; eventId: string }

export type SessionAction =
  | ({ type: 'GENERATE'; result: AllocationResult; sessionId: string; planningTerm: 1 | 2 } & Timed)
  | { type: 'OPEN_EDIT'; courseId: string; fromRoomId: string }
  | { type: 'CANCEL_EDIT' }
  | ({ type: 'APPLY_CHANGE'; courseId: string; fromRoomId: string; toRoomId: string; changeId: string; message: string } & Timed)
  | ({ type: 'REJECT_CHANGE'; courseId: string; fromRoomId: string; toRoomId: string; reason: string } & Timed)
  | ({ type: 'UNDO_CHANGE'; message: string } & Timed)
  | ({ type: 'FINISH'; message: string } & Timed)
  | { type: 'NEW_SESSION' }
  | { type: 'RESTORE'; state: SessionState }
  | { type: 'SET_ERROR'; message: string | null }
  | { type: 'SET_STORAGE_WARNING'; message: string | null }
  | { type: 'CLEAR_STATUS' }

function addEvent(events: SessionEvent[], event: SessionEvent): SessionEvent[] {
  return [...events, event]
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'GENERATE': {
      const revision = 1
      return {
        ...initialState,
        sessionId: action.sessionId,
        phase: 'running',
        planningTerm: action.planningTerm,
        revision,
        originalAssignments: action.result.assignments.map((assignment) => ({ ...assignment })),
        currentAssignments: action.result.assignments.map((assignment) => ({ ...assignment })),
        unassigned: action.result.unassigned,
        assignmentEvidence: action.result.assignments.map((assignment) => ({ courseId: assignment.courseId, everModified: false })),
        startedAt: action.now,
        events: [{ id: action.eventId, type: 'proposal-created', at: action.now, revision }],
        statusMessage: `Propuesta generada: ${action.result.assignments.length} cursos asignados.`,
      }
    }
    case 'OPEN_EDIT':
      if (state.phase !== 'running') return state
      return { ...state, editContext: { courseId: action.courseId, fromRoomId: action.fromRoomId, expectedRevision: state.revision }, errorMessage: null }
    case 'CANCEL_EDIT':
      return { ...state, editContext: null, errorMessage: null }
    case 'APPLY_CHANGE': {
      if (state.phase !== 'running') return state
      const current = state.currentAssignments.find((assignment) => assignment.courseId === action.courseId)
      if (!current || current.roomId !== action.fromRoomId) return state
      const revision = state.revision + 1
      return {
        ...state,
        revision,
        currentAssignments: state.currentAssignments.map((assignment) => assignment.courseId === action.courseId ? { ...assignment, roomId: action.toRoomId } : assignment),
        assignmentEvidence: state.assignmentEvidence.map((item) => item.courseId === action.courseId ? { ...item, everModified: true } : item),
        lastChange: { id: action.changeId, courseId: action.courseId, fromRoomId: action.fromRoomId, toRoomId: action.toRoomId, revisionAfter: revision },
        editContext: null,
        events: addEvent(state.events, { id: action.eventId, type: 'change-confirmed', at: action.now, revision, courseId: action.courseId, fromRoomId: action.fromRoomId, toRoomId: action.toRoomId }),
        statusMessage: action.message,
        errorMessage: null,
      }
    }
    case 'REJECT_CHANGE':
      return {
        ...state,
        events: addEvent(state.events, { id: action.eventId, type: 'change-rejected', at: action.now, revision: state.revision, courseId: action.courseId, fromRoomId: action.fromRoomId, toRoomId: action.toRoomId, reason: action.reason }),
        errorMessage: action.reason,
      }
    case 'UNDO_CHANGE': {
      const change = state.lastChange
      if (!change || state.phase !== 'running') return state
      const revision = state.revision + 1
      return {
        ...state,
        revision,
        currentAssignments: state.currentAssignments.map((assignment) => assignment.courseId === change.courseId ? { ...assignment, roomId: change.fromRoomId } : assignment),
        lastChange: null,
        events: addEvent(state.events, { id: action.eventId, type: 'change-undone', at: action.now, revision, courseId: change.courseId, fromRoomId: change.toRoomId, toRoomId: change.fromRoomId }),
        statusMessage: action.message,
        errorMessage: null,
      }
    }
    case 'FINISH': {
      if (state.phase !== 'running') return state
      const revision = state.revision + 1
      return {
        ...state,
        phase: 'finished',
        revision,
        finishedAt: action.now,
        lastChange: null,
        editContext: null,
        events: addEvent(state.events, { id: action.eventId, type: 'review-finished', at: action.now, revision }),
        statusMessage: action.message,
        errorMessage: null,
      }
    }
    case 'NEW_SESSION':
      return { ...initialState }
    case 'RESTORE':
      return action.state
    case 'SET_ERROR':
      return { ...state, errorMessage: action.message }
    case 'SET_STORAGE_WARNING':
      return { ...state, storageWarning: action.message }
    case 'CLEAR_STATUS':
      return { ...state, statusMessage: null, errorMessage: null }
    default:
      return state
  }
}
