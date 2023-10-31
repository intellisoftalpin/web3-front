import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {
    name: '',
    type: '',
    hash: '',
    lastModified: 0,
    size: 0
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<FileSchema>) => {
            return action.payload
        }
    }
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
