import { type FC } from 'react'
import cls from './WalletTokens.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { useTranslation } from 'react-i18next'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'

interface WalletTokensProps {
    className?: string
}

export const WalletTokens: FC<WalletTokensProps> = ({ className }) => {
    const { t } = useTranslation()
    const { tokens } = useAppSelector(getWallet)
    return (
        <div className={classNames(cls.WalletTokens, {}, [className])}>
            <table>
                <thead>
                    <tr className={cls.headerToken}>
                        <th>{t('Token')}</th>
                        <th>{t('Available balance')}</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map(token =>
                        <tr className={cls.token} key={token.unit}>
                            <th>{token.assetName}</th>
                            <th>{convertCountWithDecimals(+token.quantity, 0)}</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
