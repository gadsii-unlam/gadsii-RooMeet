/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID del proyecto de Microsoft Clarity. Opcional: sin él no se graba nada. */
  readonly VITE_CLARITY_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
