import { memo } from 'react'
import cls from './WalletConnect.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { Button } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { WalletConnected } from 'widgets/WalletConnect/ui/WalletConnected/WalletConnected'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { connectWalletActions } from 'features/connectWithWallet/model/slice/connectWalletSlice'

interface WalletConnectProps {
    className?: string
}

export const WalletConnect = memo(({ className }: WalletConnectProps) => {
    const { t } = useTranslation()
    const { connected } = useAppSelector(getAuth)
    const dispatch = useAppDispatch()

    const openWalletModal = () => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: true }))
    }

    return (
        <div className={classNames(cls.WalletConnect, {}, [className])}>
            {connected
                ? <WalletConnected/>
                : <div className={cls.disableWallet}>
                    <Button variant="outline" onClick={openWalletModal}>{t('wallet connect button')}</Button>
                </div>
            }
        </div>
    )
})
