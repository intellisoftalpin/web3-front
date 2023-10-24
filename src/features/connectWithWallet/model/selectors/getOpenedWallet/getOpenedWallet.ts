import { type RootState } from 'app/providers/StoreProvider'

export const getOpenedWallet = (state: RootState) => state.walletModal.isOpen
