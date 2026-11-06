import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@microsoft/clarity', () => ({
  default: {
    init: vi.fn(),
    setTag: vi.fn(),
    identify: vi.fn(),
    consent: vi.fn(),
    consentV2: vi.fn(),
    upgrade: vi.fn(),
    event: vi.fn(),
  },
}))

import Clarity from '@microsoft/clarity'
import { identifySession, initRecording, isRecording, resetRecordingForTests, resolveRecordingConfig, trackEvent } from '../analytics'

function goTo(url: string) {
  window.history.replaceState(null, '', url)
}

describe('grabación de sesiones con Clarity', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
    resetRecordingForTests()
    goTo('/')
  })

  it('no carga nada sin ?grabar=1', () => {
    expect(initRecording('proyecto', false)).toBe(false)
    expect(Clarity.init).not.toHaveBeenCalled()
    trackEvent('finalizar')
    expect(Clarity.event).not.toHaveBeenCalled()
  })

  it('no carga nada sin ID de proyecto ni en desarrollo', () => {
    goTo('/?grabar=1')
    expect(initRecording(undefined, false)).toBe(false)
    goTo('/?grabar=1')
    expect(initRecording('proyecto', true)).toBe(false)
    expect(Clarity.init).not.toHaveBeenCalled()
  })

  it('activa la grabación, etiqueta la prueba y limpia la URL', () => {
    goTo('/?grabar=1&tipo=usabilidad&p=P03#datos')
    expect(initRecording('proyecto', false)).toBe(true)
    expect(Clarity.init).toHaveBeenCalledWith('proyecto')
    expect(Clarity.setTag).toHaveBeenCalledWith('tipo', 'usabilidad')
    expect(Clarity.setTag).toHaveBeenCalledWith('participante', 'P03')
    expect(window.location.search).toBe('')
    expect(window.location.hash).toBe('#datos')
    expect(isRecording()).toBe(true)

    identifySession('session-1', 'monitoreo')
    expect(Clarity.identify).toHaveBeenCalledWith('session-1', undefined, 'monitoreo', 'P03')
    expect(Clarity.setTag).toHaveBeenCalledWith('roomeet_session', 'session-1')
    trackEvent('cambio-confirmado')
    expect(Clarity.event).toHaveBeenCalledWith('cambio-confirmado')
  })

  it('recuerda la configuración en la pestaña y se desactiva con ?grabar=0', () => {
    resolveRecordingConfig('?grabar=1&p=P07', sessionStorage)
    expect(resolveRecordingConfig('', sessionStorage).config).toEqual({ tipo: 'piloto', participante: 'P07' })
    expect(resolveRecordingConfig('?grabar=0', sessionStorage).config).toBeNull()
    expect(resolveRecordingConfig('', sessionStorage).config).toBeNull()
  })

  it('descarta códigos de participante que no sean anónimos', () => {
    expect(resolveRecordingConfig('?grabar=1&p=Juan%20P%C3%A9rez', sessionStorage).config?.participante).toBe('sin-codigo')
  })

  it('no graba la consulta de resultados', () => {
    goTo('/resumen-estadisticas?grabar=1')
    expect(initRecording('proyecto', false)).toBe(false)
    expect(Clarity.init).not.toHaveBeenCalled()
  })
})
