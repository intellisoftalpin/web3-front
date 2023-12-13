import { type AssetMetadata, BrowserWallet, ForgeScript, type Mint, Transaction } from '@meshsdk/core'
import { store } from 'app/providers/StoreProvider/config/store'
import { type FormNftSchema } from '../model/types/NftSchema'

export const createNFT = async (token: FormNftSchema) => {
    const { address, walletName } = store.getState().wallet
    const wallet = await BrowserWallet.enable(walletName)
    const forgingScript = ForgeScript.withOneSignature(address)

    const { name, ticker, description } = token

    const assetMetadata: AssetMetadata = {
        name,
        image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
        ticker,
        description
    }
    const asset: Mint = {
        assetName: name,
        metadata: assetMetadata,
        label: '721',
        assetQuantity: '1',
        recipient: address
    }

    const tx = new Transaction({ initiator: wallet }).mintAsset(forgingScript, asset)
    const unsignedTx = await tx.build()
    const signedTx = await wallet.signTx(unsignedTx)
    console.log(await wallet.submitTx(signedTx))
}
