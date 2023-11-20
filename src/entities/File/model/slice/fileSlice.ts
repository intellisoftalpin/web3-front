import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {
    name: '',
    type: '',
    hash: '',
    lastModified: null,
    size: null,
    signedBy: ''
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<FileSchema>) => {
            return action.payload
        },
        refreshFile: () => {
            return initialState
        }
    }
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
