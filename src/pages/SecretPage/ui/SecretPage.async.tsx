import { lazy } from 'react'

export const SecretPageAsync = lazy(async () => await import('./SecretPage'))
