import { BrowserWallet, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'

// The function of checking whether the file is already signed
export const checkFileHash = async (fileHash: string) => {
    return !!fileHash
}

// The function to sign file
export const signFile = async (fileHash: string) => {
    try {
        const walletName = store.getState().wallet.walletName
        const wallet = await BrowserWallet.enable(walletName)
        const tx = new Transaction({ initiator: wallet }).setMetadata(0, fileHash)
        const unsignedTx = await tx.build()
        const signedTx = await wallet.signTx(unsignedTx)
        console.log(signedTx)
    } catch (e) {
        console.log(e)
    }
}
