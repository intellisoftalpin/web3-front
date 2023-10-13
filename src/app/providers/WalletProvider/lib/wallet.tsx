import { BrowserWallet } from '@meshsdk/core'
import { convertToAda } from 'shared/lib/convertToAda/convertToAda'
import { type LocalStorageWallet, type WalletSchemaSetData } from 'entities/Wallet/model/types/walletSchema'
import { LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { defineNetwork } from 'shared/lib/wallet/defineNetwork/defineNetwork'

export async function getWalletInfo (): Promise<WalletSchemaSetData | undefined> {
    const walletLocalStorage: LocalStorageWallet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY) as string)
    if (walletLocalStorage) {
        const wallet = await BrowserWallet.enable(walletLocalStorage.walletName)
        const address: string[] = await wallet.getUsedAddresses()
        const balance = await wallet.getLovelace()
        const network = await wallet.getNetworkId()
        const tokens = await wallet.getAssets()

        const definedNetwork = window?._env_?.WALLET_NETWORK_KEY ? defineNetwork(network, window._env_.WALLET_NETWORK_KEY) : defineNetwork(network, process.env.WALLET_NETWORK_KEY || 'mainnet')

        return {
            address: address[0],
            balance: convertToAda(+balance),
            network: definedNetwork || 'mainnet',
            tokens
        }
    }

    return undefined
}
