import { lazy } from 'react'

export const TradePageAsync = lazy(async () => await import('./TradePage'))
