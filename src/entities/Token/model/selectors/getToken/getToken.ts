import { type RootState } from 'app/providers/StoreProvider'

export const getToken = (state: RootState) => state.token
