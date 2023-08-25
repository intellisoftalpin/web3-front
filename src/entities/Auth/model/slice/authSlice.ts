import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { connected: boolean } = {
    connected: false
}

export const authSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        auth: (state, action: PayloadAction<{ connected: boolean }>) => {
            state.connected = action.payload.connected
        }
    }
})

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice
