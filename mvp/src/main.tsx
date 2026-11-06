import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initRecording } from './analytics'
import './styles.css'

initRecording()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
