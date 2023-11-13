// interface token {
//     policyId: string
//     assetName: string
//     createdOn: string
//     logo: string
//     decimals: number
// }

interface policy {
    policyId: string
    name: string
    expiredDate: string
}

export interface PoliciesSchema {
    policies: policy[]
}
