import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from 'shared/api/baseApi'
import { walletReducer } from 'entities/Wallet'
import { tokenReducer } from 'entities/Token'
import { authReducer } from 'entities/Auth'

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        token: tokenReducer,
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(() => store.dispatch)
