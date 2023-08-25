import { type AssetExtended } from '@meshsdk/core'

export interface WalletSchema {
    icon: string
    authHash: string
    walletName: string
    balance: number
    address: string
    network: string
    tokens: AssetExtended[]
}

export interface WalletSchemaSetData {
    balance: number
    address: string
    network: string
    tokens: AssetExtended[]
}

export interface LocalStorageWallet {
    icon: string
    authHash: string
    walletName: string
}
