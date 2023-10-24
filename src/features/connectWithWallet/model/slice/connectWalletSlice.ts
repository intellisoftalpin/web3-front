import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { isOpen: boolean } = {
    isOpen: false
}

export const connectWalletSlice = createSlice({
    name: 'connectWallet',
    initialState,
    reducers: {
        openWalletModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpen = action.payload.isOpen
        }
    }
})

export const { actions: connectWalletActions } = connectWalletSlice
export const { reducer: connectWalletReducer } = connectWalletSlice
