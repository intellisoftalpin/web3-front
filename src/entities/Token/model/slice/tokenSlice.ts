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
            state.assetQuantity = action.payload.assetQuantity
            state.assetUnit = action.payload.assetUnit
            state.fee = action.payload.fee
            state.deposit = action.payload.deposit
            state.processingFee = action.payload.processingFee
            state.policyId = action.payload.policyId
            state.logo = action.payload.logo
            state.assetId = action.payload.assetId
            state.ticker = action.payload.ticker
            state.assetName = action.payload.assetName
            state.tokenPrice.price = action.payload.tokenPrice.price
            state.address = action.payload.address
            state.totalQuantity = action.payload.totalQuantity
            state.rewardAddress = action.payload.rewardAddress
            state.decimals = action.payload.decimals
        }
    }
})

export const { actions: tokenActions } = tokenSlice
export const { reducer: tokenReducer } = tokenSlice
