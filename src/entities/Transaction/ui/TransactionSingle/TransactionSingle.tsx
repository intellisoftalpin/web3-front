import { type FC } from 'react'
import cls from './TransactionSingle.module.scss'
import classNames from 'classnames'
import { type Transaction } from 'entities/Transaction/model/types/transactionSchema'
import { SingleItemHistory } from 'entities/Transaction/ui/TransactionSingle/SingleItemHistory/SingleItemHistory'
import { useTranslation } from 'react-i18next'

interface TransactionSingleProps {
    className?: string
    transaction: Transaction
}

export const TransactionSingle: FC<TransactionSingleProps> = ({
    className,
    transaction
}) => {
    const { t } = useTranslation()
    const { decodedTx, decimals } = transaction
    const transactionTxInputs = decodedTx.inputs?.map(item => <SingleItemHistory historyTransaction={item} key={item.address} decimals={decimals}/>)
    const transactionTxOutputs = decodedTx.outputs?.map(item => <SingleItemHistory historyTransaction={item} key={item.address} decimals={decimals}/>)

    return (
        <div className={classNames(cls.TransactionSingle, {}, [className])}>
            <div className={cls.inputs}>
                <span>{t('Inputs')}</span>
                <div className={cls.addresses}>
                    {transactionTxInputs}
                </div>
            </div>
            <div className={cls.inputs}>
                <span>{t('Outputs')}</span>
                <div className={cls.addresses}>
                    {transactionTxOutputs}
                </div>
            </div>
        </div>
    )
}
