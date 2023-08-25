export interface TokenSchema {
    address: string
    assetId: string
    assetName: string
    assetQuantity: number
    assetUnit: string
    decimals: number
    deposit: number
    fee: number
    logo: string
    policyId: string
    processingFee: number
    ticker: string
    rewardAddress: string
    tokenPrice: {
        price: number
    }
    totalQuantity: number
}
