import { type FC, type ReactNode, useCallback, useEffect } from 'react'
import { getWalletInfo } from 'app/providers/WalletProvider/lib/wallet'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { walletActions } from 'entities/Wallet'
import { notify } from 'shared/lib/notify/notify'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'

interface WalletProviderProps {
    children: ReactNode
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)

    const setWallet = useCallback(async () => {
        if (connected) {
            const data = await getWalletInfo()
            dispatch(walletActions.setWalletData(data))
        }
    }, [connected, dispatch])

    useEffect(() => {
        setWallet().catch((e) => { notify(e, 'error') })
    }, [setWallet])

    useEffect(() => {
        const timer = setInterval(() => {
            setWallet().catch((e) => { notify(e, 'error') })
        }, 10000)
        return () => { clearInterval(timer) }
    }, [setWallet])

    return (
        <>
            {children}
        </>
    )
}
