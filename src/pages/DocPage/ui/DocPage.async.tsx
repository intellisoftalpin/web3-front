import { lazy } from 'react'

export const DocPageAsync = lazy(async () => await import('./DocPage'))
