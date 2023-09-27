export type TypeTransaction = 'reverse' | 'buy'
export type StatusTransaction = 'draft' | 'prepared' | 'submitted' | 'success' | 'failed' | 'pending' | 'in_ledger' | 'expired'

export interface HistoryTransaction {
    address: string
    amount: {
        quantity: number
    }
    assets: Array<{
        asset_name: string
        policy_id: string
        quantity: number
    }>
}

export interface DecotedTx {
    id: string
    fee: {
        quantity: number
        unit: string
    }
    inputs: HistoryTransaction[]
    outputs: HistoryTransaction[]
    metadata: {
        1002: { string: string }
        1003: { string: string }
        1004: { int: number }
    } | null
}

export interface Transaction {
    addressTo: string
    assetId: string
    cbor: string
    createdAt: string
    policyId: string
    transferAmount: string
    assetAmount: string
    hash: string
    id: number
    status: StatusTransaction
    type: TypeTransaction
    updatedAt: string
    decodedTx: DecotedTx
    decimals: number
}

export interface SingleTransaction extends Transaction {
    addressTo: string
    assetId: string
    cbor: string
    policyId: string
    transferAmount: string
}

export interface ActiveTransaction {
    isBusy: boolean
}

export interface TransactionsResponse {
    transactions: Transaction[]
}

export interface RequestTransaction {
    addressTo: string
    assetId: string
    cbor: string
    policyId: string
    transferAmount: string
    assetAmount: string
}

export interface SaveTransaction {
    data: RequestTransaction
    type: TypeTransaction
}

export interface TransactionNewStatus {
    status: string
}

export interface ChangeTransactionStatus {
    transactionId: number
    status: StatusTransaction
}

export interface DeleteTransactionResponse {
    message: string
    status: string
}

export interface ResponseSaveTransaction {
    transactionId: number
}

export interface UpdateTransaction {
    data: RequestTransaction & { transactionId: number, type: TypeTransaction }
}
