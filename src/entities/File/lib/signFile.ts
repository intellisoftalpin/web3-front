import { BrowserWallet, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'
import { walletErrorToObject } from 'shared/lib/wallet/walletErrorToObject/walletErrorToObject'
import { toast } from 'react-toastify'

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
        toast((walletErrorToObject(e.message).info), { type: 'error' })
    }
}
