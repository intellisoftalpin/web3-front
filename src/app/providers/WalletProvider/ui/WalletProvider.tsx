import { type FC, type ReactNode, useCallback, useEffect } from 'react'
import { getWalletInfo } from 'app/providers/WalletProvider/lib/wallet'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { walletActions } from 'entities/Wallet'
import { notify } from 'shared/lib/notify/notify'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { BrowserWallet } from '@meshsdk/core'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { authActions } from 'entities/Auth/model/slice/authSlice'
import { defineNetwork } from 'shared/lib/wallet/defineNetwork'

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
                if (defineNetwork(network) !== process.env.WALLET_NETWORK_KEY) {
                    notify(`The wallet was disconnected because the main network is ${process.env.WALLET_NETWORK_KEY}, and you have ${defineNetwork(network)} connected`, 'error')
                    dispatch(authActions.auth({ connected: false }))
                    dispatch(walletActions.disconnectWallet())
                }
                if (address !== '' && changedAddress[0] !== address) {
                    dispatch(authActions.auth({ connected: false }))
                    dispatch(walletActions.disconnectWallet())
                } else {
                    const data = await getWalletInfo()
                    dispatch(walletActions.setWalletData(data))
                }
            }
        }
    }, [address, connected, dispatch, walletName])

    useEffect(() => {
        setWallet().catch((e) => { notify(e, 'error') })
    }, [setWallet])

    useEffect(() => {
        const timer = setInterval(() => {
            setWallet().catch((e) => { notify(e, 'error') })
        }, 5000)
        return () => { clearInterval(timer) }
    }, [setWallet])

    return (
        <>
            {children}
        </>
    )
}
