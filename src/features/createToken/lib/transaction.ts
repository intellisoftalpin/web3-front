import { type FormCreateToken } from '../model/types/createTokenSchema'
import { type AssetMetadata, BrowserWallet, ForgeScript, type Mint, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'

export const createToken = async (token: FormCreateToken) => {
    const { address, walletName } = store.getState().wallet
    const wallet = await BrowserWallet.enable(walletName)
    const forgingScript = ForgeScript.withOneSignature(address)

    const { name, supply } = token

    const assetMetadata: AssetMetadata = {}
    const asset: Mint = {
        assetName: name,
        metadata: assetMetadata,
        label: '721',
        assetQuantity: supply.toString(),
        recipient: address
    }

    const tx = new Transaction({ initiator: wallet }).mintAsset(forgingScript, asset)
    const unsignedTx = await tx.build()
    const signedTx = await wallet.signTx(unsignedTx)
    console.log(await wallet.submitTx(signedTx))
}
