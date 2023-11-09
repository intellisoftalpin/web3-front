import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TokenSchema } from 'entities/Token'

const initialState: TokenSchema = {
    assetQuantity: 0,
    fee: 0,
    assetUnit: '',
    deposit: 0,
    processingFee: 0,
    ticker: '',
    assetName: '',
    logo: '',
    assetId: '',
    policyId: '',
    tokenPrice: {
        price: 0
    },
    address: '',
    decimals: 0,
    totalQuantity: 0,
    rewardAddress: ''
}

export const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setChosenToken: (state, action: PayloadAction<TokenSchema>) => {
            return action.payload
        }
    }
})

export const { actions: tokenActions } = tokenSlice
export const { reducer: tokenReducer } = tokenSlice
