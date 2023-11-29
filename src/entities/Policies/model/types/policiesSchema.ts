export interface Token {
    assetId: string
    policyId: string
    assetUnit: string
    assetName: string
    createdOn: string
    logo: string
    decimals: number
}

interface Policy {
    policyId: string
    name: string
    expiredDate: string
    tokens: Token[]
}

export interface PoliciesSchema {
    policies: Policy[]
}
