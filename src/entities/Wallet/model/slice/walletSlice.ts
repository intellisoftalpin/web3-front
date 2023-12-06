import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type LocalStorageWallet, type WalletSchema, type WalletSchemaSetData } from '../types/walletSchema'
import { LOCAL_STORAGE_SESSION_AUTH_KEY, LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'

const initialState: WalletSchema = {
    icon: '',
    walletName: '',
    authHash: '',
    address: '',
    balance: 0,
    stakeAddress: '',
    network: '',
    tokens: []
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        connectWallet: (state, action: PayloadAction<LocalStorageWallet>) => {
            state.icon = action.payload.icon
            state.walletName = action.payload.walletName
            state.authHash = action.payload.authHash
        },
        setWalletData: (state, action: PayloadAction<WalletSchemaSetData>) => {
            state.balance = action.payload.balance
            state.address = action.payload.address
            state.network = action.payload.network
            state.tokens = action.payload.tokens
            state.stakeAddress = action.payload.stakeAddress
        },
        disconnectWallet: () => {
            localStorage.removeItem(LOCAL_STORAGE_SESSION_AUTH_KEY)
            localStorage.removeItem(LOCAL_STORAGE_WALLET_KEY)
            return initialState
        }
    }
})

export const { actions: walletActions } = walletSlice
export const { reducer: walletReducer } = walletSlice
