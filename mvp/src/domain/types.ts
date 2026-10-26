export type Day = 1 | 2 | 3 | 4 | 5
export type Term = 1 | 2
export type Phase = 'not-started' | 'running' | 'finished'
export type Screen = 'datos' | 'propuesta' | 'monitoreo' | 'cambio'

export interface Room {
  id: string
  name: string
  capacity: number
  mapPosition: { xPercent: number; yPercent: number }
}

export interface Course {
  id: string
  name: string
  subject: string
  curriculumCode: string
  careerId: string
  term: Term
  weeklyHours: number
  estimatedSeats: number
  enrollmentHistory: number[]
  day: Day
  startMinutes: number
  endMinutes: number
}

export interface Assignment {
  courseId: string
  roomId: string
}

export interface Review {
  courseId: string
  approved: boolean
  everModified: boolean
}

export interface LastChange {
  id: string
  courseId: string
  fromRoomId: string
  toRoomId: string
  revisionAfter: number
}

export type EventType =
  | 'proposal-created'
  | 'approval-set'
  | 'change-confirmed'
  | 'change-rejected'
  | 'change-undone'
  | 'review-finished'

export interface SessionEvent {
  id: string
  type: EventType
  at: string
  revision: number
  courseId?: string
  fromRoomId?: string
  toRoomId?: string
  approved?: boolean
  reason?: string
}

export interface UnassignedCourse {
  courseId: string
  reason: string
}

export interface EditContext {
  courseId: string
  fromRoomId: string
  expectedRevision: number
}

export interface SessionState {
  schemaVersion: 1
  datasetVersion: string
  sessionId: string
  revision: number
  phase: Phase
  originalAssignments: Assignment[]
  currentAssignments: Assignment[]
  unassigned: UnassignedCourse[]
  reviews: Review[]
  lastChange: LastChange | null
  editContext: EditContext | null
  events: SessionEvent[]
  startedAt: string | null
  finishedAt: string | null
  statusMessage: string | null
  errorMessage: string | null
  storageWarning: string | null
}

export type ViolationCode =
  | 'invalid-course'
  | 'invalid-room'
  | 'duplicate-course'
  | 'capacity'
  | 'overlap'
  | 'invalid-data'
  | 'stale-context'
  | 'same-room'
  | 'finished-session'

export interface Violation {
  code: ViolationCode
  message: string
  courseIds: string[]
  roomId?: string
}

export interface ChangeValidation {
  valid: boolean
  violations: Violation[]
}

export interface AllocationResult {
  assignments: Assignment[]
  unassigned: UnassignedCourse[]
}

export interface PilotMetrics {
  totalCourses: number
  assignedCourses: number
  coveragePercent: number
  originalOverlaps: number
  finalOverlaps: number
  originalCapacityExcesses: number
  finalCapacityExcesses: number
  approvedWithoutChanges: number
  approvedWithoutChangesPercent: number
  effectiveChanges: number
  durationMs: number | null
}
