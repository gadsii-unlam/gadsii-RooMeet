import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CompletionScreen } from '../screens/CompletionScreen'

describe('CompletionScreen', () => {
  it('informa el resultado simulado y permite reiniciar la prueba', () => {
    const onRestart = vi.fn()
    render(<CompletionScreen courseCount={65} roomCount={6} onRestart={onRestart} />)

    expect(screen.getByRole('heading', { name: 'Asignación guardada exitosamente' })).toBeVisible()
    expect(screen.getByText(/enviada al SIU Guaraní/)).toBeVisible()
    expect(screen.getByText(/ni se realizó un envío real/i)).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar prueba' }))
    expect(onRestart).toHaveBeenCalledOnce()
  })
})
