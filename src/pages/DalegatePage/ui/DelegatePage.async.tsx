import { lazy } from 'react'

export const DelegatePageAsync = lazy(async () => await import('./DelegatePage'))
