import { type RootState } from 'app/providers/StoreProvider'

export const getWallet = (state: RootState) => state.wallet
