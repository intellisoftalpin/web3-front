import { type FC, type ReactNode, useCallback, useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LOCAL_STORAGE_SESSION_AUTH_KEY, LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { type LocalStorageWallet, type WalletSchema } from 'entities/Wallet/model/types/walletSchema'
import { walletActions } from 'entities/Wallet'
import { authActions } from 'entities/Auth/model/slice/authSlice'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { useLoginMutation } from 'features/connectWithWallet/api/loginApi'

interface AuthProviderProps {
    children: ReactNode
}

const wallet: LocalStorageWallet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY) as string)
const sessionKey = localStorage.getItem(LOCAL_STORAGE_SESSION_AUTH_KEY)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)
    const [login] = useLoginMutation()

    const getSessionKey = useCallback(async () => {
        const { sessionAuthorizationKey } = await login({ userHash: wallet.authHash }).unwrap()
        return sessionAuthorizationKey
    }, [login])

    useEffect(() => {
        if (wallet && sessionKey) {
            dispatch(walletActions.connectWallet(wallet))
            dispatch(authActions.auth({ connected: true }))
        } else {
            localStorage.removeItem(LOCAL_STORAGE_SESSION_AUTH_KEY)
        }
    }, [dispatch])

    useEffect(() => {
        const wallet: WalletSchema = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY) as string)
        if (!connected && wallet) {
            getSessionKey()
                .then(key => {
                    localStorage.setItem(LOCAL_STORAGE_SESSION_AUTH_KEY, key)
                    dispatch(authActions.auth({ connected: true }))
                    dispatch(walletActions.connectWallet(wallet))
                })
                .catch(console.log)
        }
    }, [connected, dispatch, getSessionKey])

    return (
        <>
            {children}
        </>
    )
}
