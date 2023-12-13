import { type ReactNode, useCallback } from 'react'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { connectWalletActions } from 'features/connectWithWallet/model/slice/connectWalletSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from 'shared/ui/Button'

interface CheckAuthButtonProps {
    children: ReactNode
}

export const CheckAuthButton = ({ children }: CheckAuthButtonProps) => {
    const { connected } = useAppSelector(getAuth)
    const dispatch = useAppDispatch()

    const onOpenConnectWallet = useCallback(() => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: true }))
    }, [dispatch])

    return (
        <>
            {connected
                ? children
                : <Button type='button' variant='outline' onClick={onOpenConnectWallet}>Connect to a wallet</Button>
            }
        </>
    )
}
