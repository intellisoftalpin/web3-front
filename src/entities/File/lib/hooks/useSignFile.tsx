import { useCheckFileMetadataHash } from './useCheckFileMetadataHash'
import cls from './CreatedMessage.module.scss'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { useCallback, useEffect, useState } from 'react'
import { fileApi, signFile } from 'entities/File'
import { toast } from 'react-toastify'

const CreatedMessage = (props: { text: string, hash: string }) => {
    return (
        <div className={cls.createdMessage}>
            <span>{props.text}</span>
            <a href={`https://cardanoscan.io/transaction/${props.hash}`} target="_blank" rel="noreferrer">cardanoscan: {props.hash}</a>
        </div>
    )
}

export const useSignFile = () => {
    const [isLoading, setLoading] = useState(false)
    const { checkFileHash } = useCheckFileMetadataHash()
    const fileHash = useAppSelector(getFileHash)
    const [submitTransaction, { data }] = fileApi.useSubmitFileTransactionMutation()

    const signTransaction = useCallback(async () => {
        setLoading(true)
        const checked = await checkFileHash()
        if (!checked) {
            const cbor = await signFile(fileHash)
            if (cbor) await submitTransaction({ cbor }).finally(() => { setLoading(false) })
            else setLoading(false)
        } else {
            toast('Failure: The provided file has already been signed', { type: 'error' })
            setLoading(false)
        }
    }, [checkFileHash, fileHash, submitTransaction])

    useEffect(() => {
        if (data?.txHash) {
            toast(<CreatedMessage text='File signed' hash={data.txHash}/>, { type: 'success' })
        }
    }, [data])

    return { signTransaction, isLoading }
}
