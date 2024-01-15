import { BrowserWallet, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'
import { toast } from 'react-toastify'
import { type FileSchema } from '../model/types/fileSchema'
import moment from 'moment'
import { shortFormatText } from 'shared/lib/shortFormatText/shortFormatText'

// The function to sign file
export const signFile = async (fileMetadata: FileSchema) => {
    try {
        let { hash, signedBy, lastModified, type, name, size } = fileMetadata
        const walletName = store.getState().wallet.walletName
        const wallet = await BrowserWallet.enable(walletName)
        const tx = new Transaction({ initiator: wallet })
        const lastModifiedDate = moment(lastModified).format('YYYY-MM-DD HH:mm:ss')
        type = shortFormatText(type, 60)
        name = shortFormatText(name, 60)
        tx.setMetadata(10337, hash)
        tx.setMetadata(10338, { name, signedBy, lastModifiedDate, type, size })
        const unsignedTx = await tx.build()
        return await wallet.signTx(unsignedTx)
    } catch (e: any) {
        toast(e.message, { type: 'error' })
    }
}
