import { type FC, type ReactNode, useCallback, useEffect } from 'react'
import { getWalletInfo } from 'app/providers/WalletProvider/lib/wallet'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { walletActions } from 'entities/Wallet'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { BrowserWallet } from '@meshsdk/core'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { authActions } from 'entities/Auth/model/slice/authSlice'
import { defineNetwork } from 'shared/lib/wallet/defineNetwork/defineNetwork'
import { type WalletSchemaSetData } from 'entities/Wallet/model/types/walletSchema'
import { toast } from 'react-toastify'

interface WalletProviderProps {
    children: ReactNode
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)
    const { address, walletName } = useAppSelector(getWallet)

    const setWallet = useCallback(async () => {
        if (connected) {
            const wallet = await BrowserWallet.enable(walletName).catch(() => {
                dispatch(authActions.auth({ connected: false }))
                dispatch(walletActions.disconnectWallet())
            })
            if (wallet) {
                const changedAddress: string[] = await wallet.getUsedAddresses()
                const network = await wallet.getNetworkId()
                if (window?._env_?.WALLET_NETWORK_KEY) {
                    if (defineNetwork(network, window?._env_?.WALLET_NETWORK_KEY) !== window?._env_?.WALLET_NETWORK_KEY) {
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        toast(`The wallet was disconnected because the main network is ${window?._env_?.WALLET_NETWORK_KEY}, and you have ${defineNetwork(network, window?._env_?.WALLET_NETWORK_KEY)} connected`, { type: 'error' })
                        dispatch(authActions.auth({ connected: false }))
                        dispatch(walletActions.disconnectWallet())
                    }
                } else {
                    if (defineNetwork(network, process.env.WALLET_NETWORK_KEY || 'mainnet') !== process.env.WALLET_NETWORK_KEY) {
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        toast(`The wallet was disconnected because the main network is ${process?.env?.WALLET_NETWORK_KEY}, and you have ${defineNetwork(network, process.env.WALLET_NETWORK_KEY || 'mainnet')} connected`, { type: 'error' })
                        dispatch(authActions.auth({ connected: false }))
                        dispatch(walletActions.disconnectWallet())
                    }
                }
                if (address !== '' && changedAddress[0] !== address) {
                    dispatch(authActions.auth({ connected: false }))
                    dispatch(walletActions.disconnectWallet())
                } else {
                    const data: WalletSchemaSetData | undefined = await getWalletInfo()
                    if (data) {
                        dispatch(walletActions.setWalletData(data))
                    }
                }
            }
        }
    }, [address, connected, dispatch, walletName])

    useEffect(() => {
        setWallet().catch((e) => { toast(e, { type: 'error' }) })
    }, [setWallet])

    useEffect(() => {
        const timer = setInterval(() => {
            setWallet().catch((e) => { toast(e, { type: 'error' }) })
        }, 5000)
        return () => { clearInterval(timer) }
    }, [setWallet])

    return (
        <>
            {children}
        </>
    )
}
