import { type RootState } from 'app/providers/StoreProvider'

export const getAuth = (state: RootState) => state.auth
