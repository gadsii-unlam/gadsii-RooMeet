import type { Phase, Screen } from '../domain/types'

const steps: Array<{ id: Exclude<Screen, 'cambio'>; label: string; number: number }> = [
  { id: 'datos', label: 'Datos', number: 1 },
  { id: 'propuesta', label: 'Propuesta', number: 2 },
  { id: 'monitoreo', label: 'Monitoreo', number: 3 },
]

export function StepNavigation({ screen, phase, onNavigate }: { screen: Screen; phase: Phase; onNavigate: (screen: Screen) => void }) {
  return (
    <nav className="step-nav" aria-label="Etapas de la prueba">
      {steps.map((step) => {
        const disabled = step.id !== 'datos' && phase === 'not-started'
        const active = screen === step.id || (screen === 'cambio' && step.id === 'monitoreo')
        return (
          <button key={step.id} className={active ? 'step active' : 'step'} disabled={disabled} onClick={() => onNavigate(step.id)}>
            <span>{step.number}</span>{step.label}
          </button>
        )
      })}
    </nav>
  )
}
