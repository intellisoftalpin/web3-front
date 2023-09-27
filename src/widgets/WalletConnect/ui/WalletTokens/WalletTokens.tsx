import { type FC } from 'react'
import cls from './WalletTokens.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { useTranslation } from 'react-i18next'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'
import { TokenImage } from 'shared/ui/TokenImage'
import { stringToHex } from 'shared/lib/stringToHex/stringToHex'
import { shortFormatText } from 'shared/lib/shortFormatText/shortFormatText'

interface WalletTokensProps {
    className?: string
}

export const WalletTokens: FC<WalletTokensProps> = ({ className }) => {
    const { t } = useTranslation()
    const { tokens } = useAppSelector(getWallet)

    return (
        <div className={classNames(cls.WalletTokens, {}, [className])}>
            <div className={cls.token}>
                <div className={cls.tokenName}>
                    <span>{t('Token')}</span>
                </div>
                <div className={cls.tokenBalance}>
                    <span>{t('Available balance')}</span>
                </div>
            </div>
            <div className={cls.walletTokensBlock}>
                {tokens.map(token =>
                    <div className={cls.token} key={token.unit}>
                        <div className={cls.tokenName}>
                            <TokenImage assetId={stringToHex(token.assetName)} policyId={token.policyId}/>
                            <span>{token.assetName.length > 10
                                ? shortFormatText(token.assetName, 6)
                                : token.assetName}</span>
                        </div>
                        <div className={cls.tokenBalance}>
                            <span>{convertCountWithDecimals(+token.quantity, 0)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
