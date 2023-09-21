import { type FC } from 'react'
import cls from './WalletDropdown.module.scss'
import classNames from 'classnames'
import { Button } from 'shared/ui/Button'
import Copy from 'shared/assets/icon/copyClipboard.svg'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { shortFormatText } from 'shared/lib/shortFormatText/shortFormatText'
import { copyText } from 'shared/lib/copyText/copyText'
import { authActions } from 'entities/Auth/model/slice/authSlice'
import { walletActions } from 'entities/Wallet'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { WalletTokens } from 'widgets/WalletConnect/ui/WalletTokens/WalletTokens'
import { useTranslation } from 'react-i18next'

interface WalletDropdownProps {
    className?: string
    openedDropdown: boolean
}

export const WalletDropdown: FC<WalletDropdownProps> = ({ className, openedDropdown }) => {
    const { t } = useTranslation()
    const { walletName, icon, address, network, tokens } = useAppSelector(getWallet)
    const dispatch = useAppDispatch()

    const disconnectWallet = () => {
        dispatch(authActions.auth({ connected: false }))
        dispatch(walletActions.disconnectWallet())
    }

    return (
        <div className={classNames(cls.WalletDropdown, { [cls.show]: openedDropdown }, [className])}>
            <div className={cls.activeWallet}>
                <h1>{t('Active Wallet')}</h1>
                <div className={cls.walletInformation}>
                    <div className={cls.connectedWallet}>
                        <div className={cls.name}>
                            <img src={icon} alt="wallet"/>
                            <span>{walletName}</span>
                        </div>
                        <div className={cls.network}>
                            <span>{network}</span>
                        </div>
                    </div>
                    <div className={cls.address}>
                        <span>{shortFormatText(address, 9) }</span>
                        <Copy className={cls.copy} onClick={async () => { await copyText(address) }}/>
                    </div>
                </div>
            </div>
            {tokens.length !== 0 &&
                <div className={cls.tokens}>
                    <h1>{t('Tokens')}</h1>
                    <WalletTokens/>
                </div>
            }
            <div className={cls.disconnect}>
                <Button variant='outline' className={cls.disconnectButton} onClick={disconnectWallet}>
                    {t('Disconnect wallet')}
                </Button>
            </div>
        </div>
    )
}
