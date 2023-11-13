import { BrowserWallet, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'
import { notify } from 'shared/lib/notify/notify'
import { walletErrorToObject } from 'shared/lib/wallet/walletErrorToObject/walletErrorToObject'

// The function to sign file
export const signFile = async (fileHash: string) => {
    try {
        const walletName = store.getState().wallet.walletName
        const wallet = await BrowserWallet.enable(walletName)
        const tx = new Transaction({ initiator: wallet })
        tx.setMetadata(10337, fileHash)
        const unsignedTx = await tx.build()
        return await wallet.signTx(unsignedTx)
    } catch (e: any) {
        notify((walletErrorToObject(e.message).info), 'error')
    }
}
