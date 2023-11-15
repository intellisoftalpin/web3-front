import { useCheckFileMetadataHash } from './useCheckFileMetadataHash'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { useCallback, useEffect, useState } from 'react'
import { fileApi, signFile } from 'entities/File'
import { toast } from 'react-toastify'

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
        }
    }, [checkFileHash, fileHash, submitTransaction])

    useEffect(() => {
        if (data?.txHash) {
            toast(`File signed, hash ${data.txHash}`, { type: 'success' })
        }
    }, [data])

    return { signTransaction, isLoading }
}
