import { type RootState } from 'app/providers/StoreProvider'

export const getFileHash = (state: RootState) => state.file.hash
