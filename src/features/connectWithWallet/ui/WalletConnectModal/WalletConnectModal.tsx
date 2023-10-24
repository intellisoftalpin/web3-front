import { memo } from 'react'
import classNames from 'classnames'
import cls from './WalletConnect.module.scss'
import { Modal } from 'shared/ui/Modal'
import { WalletSelection } from '../WalletSelection/WalletSelection'
import { OtherWallets } from '../OtherWallets/OtherWallets'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getOpenedWallet } from 'features/connectWithWallet/model/selectors/getOpenedWallet/getOpenedWallet'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { connectWalletActions } from '../../model/slice/connectWalletSlice'

interface WalletConnectModalProps {
    className?: string
}

export const WalletConnectModal = memo((props: WalletConnectModalProps) => {
    const { className } = props
    const { t } = useTranslation()
    const isOpen = useAppSelector(getOpenedWallet)
    const dispatch = useAppDispatch()

    const onClose = (active: boolean) => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: active }))
    }

    return (
        <Modal opened={isOpen} onClose={onClose} className={classNames(cls.WalletConnectModal, [className])}>
            <h1>{t('wallet connect button')}</h1>
            <WalletSelection onClose={onClose}/>
            <OtherWallets/>
        </Modal>
    )
})
