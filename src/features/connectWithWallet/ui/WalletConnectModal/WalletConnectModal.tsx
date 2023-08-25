import { type FC } from 'react'
import classNames from 'classnames'
import cls from './WalletConnect.module.scss'
import { Modal } from 'shared/ui/Modal'
import { WalletSelection } from '../WalletSelection/WalletSelection'
import { OtherWallets } from '../OtherWallets/OtherWallets'
import { useTranslation } from 'react-i18next'

interface WalletConnectModalProps {
    className?: string
    isOpen: boolean
    onClose: (active: boolean) => void
}

export const WalletConnectModal: FC<WalletConnectModalProps> = (props) => {
    const { t } = useTranslation()
    const {
        className,
        isOpen,
        onClose
    } = props

    return (
        <Modal opened={isOpen} onClose={onClose} className={classNames(cls.WalletConnectModal, [className])}>
            <h1>{t('wallet connect button')}</h1>
            <WalletSelection onClose={onClose}/>
            <OtherWallets/>
        </Modal>
    )
}
