import { BrowserWallet, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'
import { walletErrorToObject } from 'shared/lib/wallet/walletErrorToObject/walletErrorToObject'
import { toast } from 'react-toastify'
import { type FileSchema } from '../model/types/fileSchema'
import moment from 'moment'

// The function to sign file
export const signFile = async (fileMetadata: FileSchema) => {
    try {
        const walletName = store.getState().wallet.walletName
        const wallet = await BrowserWallet.enable(walletName)
        const tx = new Transaction({ initiator: wallet })
        const lastModified = moment(fileMetadata.lastModified).format('YYYY-MM-DD HH:mm:ss')
        tx.setMetadata(10337, { ...fileMetadata, lastModified })
        const unsignedTx = await tx.build()
        return await wallet.signTx(unsignedTx)
    } catch (e: any) {
        toast((walletErrorToObject(e.message).info), { type: 'error' })
    }
}
