import { memo } from 'react'
import cls from './SingleItemHistory.module.scss'
import classNames from 'classnames'
import { shortFormatText } from 'shared/lib/shortFormatText/shortFormatText'
import { convertToAda } from 'shared/lib/convertToAda/convertToAda'
import { type HistoryTransaction } from 'entities/Transaction/model/types/transactionSchema'
import { hexToString } from 'shared/lib/hexToString/hexToString'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'
import { TokenImage } from 'shared/ui/TokenImage'
import { explorerAddressesLink } from 'shared/consts/env'

interface SingleItemHistoryProps {
    className?: string
    historyTransaction: HistoryTransaction
    decimals: number
}

export const SingleItemHistory = memo((props: SingleItemHistoryProps) => {
    const { className, historyTransaction, decimals } = props
    const { address, assets, amount } = historyTransaction

    return (
        <>
            {address &&
                <div className={classNames(cls.SingleItemHistory, {}, [className])}>
                    <a
                        href={`${explorerAddressesLink}${address}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {address && shortFormatText(address, 20)}
                    </a>
                    <div className={cls.amount}>
                        <span>{convertToAda(amount.quantity)}{'₳'}</span>
                        <div className={cls.tokenBuy}>
                            {assets.map(item =>
                                <div className={cls.token} key={`${item.policy_id}${item.asset_name}`}>
                                    <TokenImage assetId={item.asset_name} policyId={item.policy_id} className={cls.tokenImage}/>
                                    <span>{hexToString(item.asset_name)}</span>
                                    <span className={cls.quantityTokens}>{convertCountWithDecimals(item.quantity, decimals)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>

    )
})
