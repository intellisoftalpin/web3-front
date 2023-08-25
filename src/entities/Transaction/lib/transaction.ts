import { store } from 'app/providers/StoreProvider/config/store'
import { BrowserWallet, Transaction } from '@meshsdk/core'

export const makeCborBuyTokens = async (transferAmountTokens: string, transferAmountFee: string) => {
    try {
        const { walletName, address: ownerAddress } = store.getState().wallet
        const { assetId, policyId, address, rewardAddress, assetQuantity } = store.getState().token
        const wallet = await BrowserWallet.enable(walletName)
        const tx = new Transaction({ initiator: wallet })
            .sendLovelace(address, transferAmountFee)
            .sendLovelace(rewardAddress, transferAmountTokens)
        tx.setMetadata(1010, ownerAddress.substring(0, 64))
        tx.setMetadata(1011, ownerAddress.substring(64))
        tx.setMetadata(1002, policyId)
        tx.setMetadata(1003, assetId)
        tx.setMetadata(1004, assetQuantity)
        const unsignedTx = await tx.build()
        return await wallet.signTx(unsignedTx)
    } catch (e) {
        console.log(e)
    }
}
