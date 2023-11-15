import { memo, useCallback, useEffect, useState } from 'react'
import cls from './Trade.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Arrow from 'shared/assets/icon/arrowRight.svg'
import CardanoIcon from 'shared/assets/icon/cardano.png'
import { Button } from 'shared/ui/Button'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { SelectTokenModal } from 'features/selectToken'
import { getToken, tokenActions, useGetTokensQuery } from 'entities/Token'
import { convertToAda } from 'shared/lib/convertToAda/convertToAda'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import {
    makeCborBuyTokens
} from 'entities/Transaction/lib/transaction'
import { type RequestTransaction } from 'entities/Transaction/model/types/transactionSchema'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useGetTransactionActiveQuery, useSaveTransactionMutation } from 'entities/Transaction'
import { convertToLovelaces } from 'shared/lib/convertToLovalaces/convertToLovelaces'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'
import { Tooltip } from 'shared/ui/Tooltip'
import { TokenImage } from 'shared/ui/TokenImage'
import { connectWalletActions } from 'features/connectWithWallet/model/slice/connectWalletSlice'
import { toast } from 'react-toastify'

interface TradeProps {
    className?: string
}

export const Trade = memo(({ className }: TradeProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)
    const {
        assetName, assetId, logo, tokenPrice, policyId, address,
        assetUnit, fee, processingFee, assetQuantity, deposit, decimals,
        totalQuantity
    } = useAppSelector(getToken)
    const [isBusyTransaction, setBusyTransaction] = useState(true)
    const [choiceTokenModal, setChoiceTokenModal] = useState(false)

    const { data: tokens } = useGetTokensQuery('', { pollingInterval: 20000 })
    const [saveTransaction] = useSaveTransactionMutation()
    const { data: transactionPending } = useGetTransactionActiveQuery('', { skip: !isBusyTransaction || !connected, pollingInterval: 10000 })

    useEffect(() => {
        if (transactionPending) {
            setBusyTransaction(transactionPending.isBusy)
        }
    }, [transactionPending])

    useEffect(() => {
        if (tokens) {
            const index = tokens.findIndex((item) => item.policyId + item.assetId === policyId + assetId)
            dispatch(tokenActions.setChosenToken(tokens[index === -1 ? 0 : index]))
        }
    }, [assetId, dispatch, policyId, tokens])

    const openTokenModal = () => {
        if (tokensCheck) {
            setChoiceTokenModal(true)
        }
    }

    const openConnectWalletModal = () => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: true }))
    }

    const createTransactionBuyTokens = async () => {
        try {
            const transferAmountTokens = String(tokenPrice.price)
            const transferAmountFee = String(deposit + processingFee)
            const cbor = await makeCborBuyTokens(transferAmountTokens, transferAmountFee, fee)
            if (cbor) {
                const data: RequestTransaction = {
                    addressTo: address,
                    policyId,
                    assetId,
                    cbor,
                    transferAmount: String(convertToLovelaces(+sumTransferAmount())),
                    assetAmount: String(assetQuantity)
                }
                await saveTransaction({ type: 'buy', data }).unwrap().then((data) => {
                    console.log(data)
                    if (data.transactionId) {
                        setBusyTransaction(true)
                        toast('Transaction created', { type: 'success' })
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const tokensCheck = tokens && tokens.length > 1

    const sumTransferAmount = useCallback(() => {
        return String(convertToAda(tokenPrice.price + deposit + processingFee + fee))
    }, [deposit, fee, processingFee, tokenPrice.price])

    return (
        <div className={classNames(cls.Trade, {}, [className])}>
            <div className={cls.header}>
                <h1>{t('Buy')}</h1>
            </div>
            <div className={cls.amountInput}>
                <h2>{t('total')}: {convertCountWithDecimals(totalQuantity, decimals) } {assetUnit || assetName}</h2>
            </div>
            <div className={cls.selectToken}>
                <div className={classNames(cls.assetA, { [cls.someTokensHover]: tokensCheck })}
                    onClick={openTokenModal}>
                    <span>{t('Buy')}</span>
                    <div className={cls.assetImage}>
                        <span>{convertCountWithDecimals(assetQuantity, decimals)}</span>
                        <TokenImage logo={logo} policyId={policyId} assetId={assetId}/>
                        <span>{assetName}</span>
                    </div>
                    {tokensCheck && <Arrow className={cls.arrow}/>}
                    {tokensCheck &&
                        <SelectTokenModal tokens={tokens} opened={choiceTokenModal} onClose={setChoiceTokenModal}/>}
                </div>
                <div className={cls.assetB}>
                    <span>{t('Pay with')}</span>
                    <div className={cls.assetImage}>
                        <img src={CardanoIcon} alt="cardano"/>
                        <span>{'₳'}</span>
                    </div>
                </div>
            </div>
            <div className={cls.transactionInfo}>
                <div className={cls.info}>
                    <div className={cls.tooltip}>
                        <span>{t('Amount spent')}</span>
                        <Tooltip text={t('Amount Spent Tooltip')} id={'amountSpent'}/>
                    </div>
                    <span>{'₳'}{convertToAda(tokenPrice.price)}</span>
                </div>
                <div className={cls.info}>
                    <div className={cls.tooltip}>
                        <span>{t('Fee')}</span>
                        <Tooltip text={t('Fee Tooltip')} id={'fee'}/>
                    </div>
                    <span>~{'₳'}{convertToAda(fee)}</span>
                </div>
                <div className={cls.info}>
                    <div className={cls.tooltip}>
                        <span>{t('Scooper Processing Fee')}</span>
                        <Tooltip text={t('Processing Fee Tooltip')} id={'Processing Fee'}/>
                    </div>
                    <span>{'₳'}{convertToAda(processingFee)}</span>
                </div>
                <div className={cls.info}>
                    <div className={cls.tooltip}>
                        <span>{t('Deposit')}</span>
                        <Tooltip text={t('Deposit Tooltip')} id={'Deposit'}/>
                    </div>
                    <span>{'₳'}{convertToAda(deposit)}</span>
                </div>
                <div className={cls.info}>
                    <div className={cls.tooltip}>
                        <span>{t('Transfer amount')}</span>
                        <Tooltip text={t('Transfer Amount Tooltip')} id={'Transfer amount'}/>
                    </div>
                    <span>~{'₳'}{sumTransferAmount()}</span>
                </div>
                <div className={cls.info}>
                    <div className={cls.tooltip}>
                        <span>{t('Returned Amount')}</span>
                        <Tooltip text={t('Returned Amount Tooltip')} id={'Returned Amount'}/>
                    </div>
                    <div className={cls.returnedBlock}>
                        <span>{'₳'}{convertToAda(deposit)}</span>
                        <span>{t('and')}</span>
                        <span>{convertCountWithDecimals(assetQuantity, decimals)} {assetUnit || assetName}</span>
                    </div>
                </div>
            </div>
            <div className={cls.deposit}>
                {connected
                    ? <Button disabled={isBusyTransaction} variant="outline" onClick={async () => {
                        await createTransactionBuyTokens()
                    }}>{isBusyTransaction ? t('Transaction pending') : t('Buy')}</Button>
                    : <Button variant="outline" onClick={openConnectWalletModal}>{t('wallet connect button')}</Button>
                }
            </div>
        </div>
    )
})
