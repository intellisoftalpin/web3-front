import { type FC, useEffect, useState } from 'react'
import cls from './TransactionList.module.scss'
import classNames from 'classnames'
import { useGetTransactionsQuery } from 'entities/Transaction'
import { TransactionItem } from '../TransactionItem/TransactionItem'
import { type Transaction } from 'entities/Transaction/model/types/transactionSchema'
import Refresh from 'shared/assets/icon/loader.svg'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { useTranslation } from 'react-i18next'

interface TransactionListProps {
    className?: string
}

export const TransactionList: FC<TransactionListProps> = ({ className }) => {
    const { t } = useTranslation()
    const [transactions, setTransactions] = useState<Transaction[] | []>([])

    const { connected } = useAppSelector(getAuth)

    const { data: transactionsResponse, refetch: transactionRefetch } = useGetTransactionsQuery('', { skip: !connected })

    useEffect(() => {
        if (transactionsResponse && connected) {
            const transactions: Transaction[] = [...transactionsResponse.transactions]
            setTransactions(transactions.sort((a, b) => b.id - a.id))
        } else {
            setTransactions([])
        }
    }, [connected, transactionsResponse])

    const transactionItems = transactions.map(item => <TransactionItem key={item.id} transaction={item}/>)

    return (
        <div className={classNames(cls.TransactionList, {}, [className])}>
            <div className={cls.header}>
                <h1>{t('Recent Transactions')}</h1>
                {connected &&
                    <div className={cls.refresh} onClick={transactionRefetch}>
                        <Refresh className={cls.refreshIcon}/>
                    </div>
                }
            </div>
            <div className={cls.transactions}>
                {transactionItems}
            </div>
        </div>
    )
}
