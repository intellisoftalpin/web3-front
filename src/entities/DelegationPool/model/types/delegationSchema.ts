export interface DelegationPoolSchema {
    id: number
    ticker: string
    name: string
    poolId: string
    saturation: string
    pledge: string
    fee: string
    rose12: string
}

export interface AllDelegationResponse {
    pools: DelegationPoolSchema[]
}
