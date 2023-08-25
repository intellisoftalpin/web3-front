import { type WalletSchema } from 'entities/Wallet/model/types/walletSchema'
import { LOCAL_STORAGE_SESSION_AUTH_KEY, LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { useLoginMutation } from 'features/connectWithWallet/api/loginApi'

const wallet: WalletSchema = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY))

export const useReAuth = () => {
    const [login] = useLoginMutation()

    const reconnect = async () => {
        if (wallet) {
            const { sessionAuthorizationKey } = await login({ userHash: wallet.authHash, userRuntime: 0 }).unwrap()
            localStorage.setItem(LOCAL_STORAGE_SESSION_AUTH_KEY, sessionAuthorizationKey)
        }
    }

    return {
        reconnect
    }
}
