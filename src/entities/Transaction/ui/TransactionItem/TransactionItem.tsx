import { type FC, useState } from 'react'
import cls from './TransactionItem.module.scss'
import classNames from 'classnames'
import { type Transaction } from 'entities/Transaction/model/types/transactionSchema'
import { convertToAda } from 'shared/lib/convertToAda/convertToAda'
import { hexToString } from 'shared/lib/hexToString/hexToString'
import { useDeleteTransactionMutation } from 'entities/Transaction'
import DeleteTransaction from 'shared/assets/icon/delete.svg'
import OpenSingleTransaction from 'shared/assets/icon/openerSingleTransaction.svg'
import { TransactionSingle } from '../TransactionSingle/TransactionSingle'
import moment from 'moment'
import Arrow from 'shared/assets/icon/arrow.svg'
import Copy from 'shared/assets/icon/copyClipboard.svg'
import Calendar from 'shared/assets/icon/calendar.svg'
import { useTranslation } from 'react-i18next'
import { copyText } from 'shared/lib/copyText/copyText'
import { notify } from 'shared/lib/notify/notify'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'
import { TokenImage } from 'shared/ui/TokenImage'

interface TransactionItemProps {
    className?: string
    transaction: Transaction
}

export const TransactionItem: FC<TransactionItemProps> = ({
    className,
    transaction
}) => {
    const [deleteTransaction] = useDeleteTransactionMutation()

    const {
        t,
        i18n
    } = useTranslation()

    const [singleTransaction, setSingleTransaction] = useState(false)

    const deleteTransactionHandler = async () => {
        await deleteTransaction(transaction.id).unwrap().then((e) => { notify(e.message, 'success') })
    }

    return (
        <div className={classNames(cls.TransactionItem, {}, [className])}>
            <div className={cls.transaction}>
                <div className={cls.info}>
                    <div className={cls.transactionInfo}>
                        <div className={cls.status}>
                            <Arrow className={classNames(cls.arrow, {
                                [cls.arrowSent]: transaction.type === 'Sent' || transaction.type === 'buy',
                                [cls.arrowReceived]: transaction.type === 'received' || transaction.type === 'reverse'
                            })}/>
                            <span className={cls.statusText}>{t(transaction.status)} ({t(transaction.type)})</span>
                        </div>
                        {transaction.hash &&
                            <div className={cls.transactionId}>
                                <a
                                    href={`https://preprod.cardanoscan.io/transaction/${transaction.hash}`}
                                    target="_blank" rel="noreferrer"
                                >
                                    {transaction.hash}
                                </a>
                                <div className={cls.copy} onClick={async () => {
                                    await copyText(transaction.hash)
                                }}>
                                    <Copy className={cls.copyClipboard}/>
                                </div>
                            </div>
                        }
                        <div className={cls.transactionCreated}>
                            <Calendar className={cls.calendar}/>
                            <span>{moment(transaction.createdAt).locale(i18n.language).format('MMMM Do, YYYY, HH:mm')}</span>
                        </div>
                    </div>
                    <div className={cls.transactionAmount}>
                        <div className={cls.amountAda}>
                            <span className={
                                classNames({
                                    [cls.buy]: transaction.type === 'Sent' || transaction.type === 'buy',
                                    [cls.reverse]: transaction.type === 'received' || transaction.type === 'reverse'
                                })}
                            >
                                {convertToAda(+transaction.transferAmount)}{'₳'}
                            </span>
                        </div>
                        <div className={cls.fee}>
                            <span>{t('Fee')}: {convertToAda(+transaction.decodedTx.fee.quantity)}{'₳'}</span>
                        </div>
                        {
                            +transaction.assetAmount > 0 &&
                            <div className={cls.tokenBuy}>
                                <div className={cls.token}>
                                    <Arrow className={classNames(cls.arrow, {
                                        [cls.arrowSent]: transaction.type === 'Sent' || transaction.type === 'buy',
                                        [cls.arrowReceived]: transaction.type === 'received' || transaction.type === 'reverse'
                                    })}/>
                                    <TokenImage assetId={transaction.assetId} policyId={transaction.policyId} className={cls.tokenImage}/>
                                    <span>{hexToString(transaction.assetId)}</span>
                                    <span className={cls.amount}>{convertCountWithDecimals(+transaction.assetAmount, transaction.decimals)}</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={cls.actions}>
                        {transaction.status === 'draft' &&
                            <div className={cls.action} onClick={deleteTransactionHandler}>
                                <DeleteTransaction className={cls.actionItem}/>
                            </div>
                        }
                        {
                            transaction.status !== 'draft' &&
                            <div className={classNames(cls.action, { [cls.active]: singleTransaction })}
                                onClick={() => {
                                    setSingleTransaction(prevState => !prevState)
                                }}>
                                <OpenSingleTransaction className={cls.actionItem}/>
                            </div>
                        }
                    </div>
                </div>
                {
                    singleTransaction &&
                    <TransactionSingle transaction={transaction}/>
                }

            </div>
        </div>
    )
}
