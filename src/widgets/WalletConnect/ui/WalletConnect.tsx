import { type FC, useState } from 'react'
import cls from './WalletConnect.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { WalletConnectModal } from 'features/connectWithWallet'
import { Button } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { WalletConnected } from 'widgets/WalletConnect/ui/WalletConnected/WalletConnected'

interface WalletConnectProps {
    className?: string
}

export const WalletConnect: FC<WalletConnectProps> = ({ className }) => {
    const { t } = useTranslation()
    const { connected } = useAppSelector(getAuth)

    const [walletModal, setWalletModal] = useState<boolean>(false)

    const openWalletModal = () => {
        setWalletModal(true)
    }

    return (
        <div className={classNames(cls.WalletConnect, {}, [className])}>
            {connected
                ? <WalletConnected/>
                : <div className={cls.disableWallet}>
                    <Button variant="outline" onClick={openWalletModal}>{t('wallet connect button')}</Button>
                    <WalletConnectModal onClose={setWalletModal} isOpen={walletModal}/>
                </div>
            }
        </div>
    )
}
