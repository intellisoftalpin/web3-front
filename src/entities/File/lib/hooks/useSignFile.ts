import { useCheckFileMetadataHash } from './useCheckFileMetadataHash'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { useCallback, useEffect, useState } from 'react'
import { fileApi, signFile } from 'entities/File'
import { notify } from 'shared/lib/notify/notify'

export const useSignFile = () => {
    const [isLoading, setLoading] = useState(true)
    const { checkFileHash, isLoading: isCheckFileLoading } = useCheckFileMetadataHash()
    const fileHash = useAppSelector(getFileHash)
    const [submitTransaction, { isLoading: isSubmitLoading, data }] = fileApi.useSubmitFileTransactionMutation()

    const signTransaction = useCallback(async () => {
        const checked = await checkFileHash()
        if (!checked) {
            const cbor = await signFile(fileHash)
            if (cbor) await submitTransaction({ cbor })
        }
    }, [checkFileHash, fileHash, submitTransaction])

    useEffect(() => {
        if (isCheckFileLoading && isSubmitLoading) setLoading(true)
        else setLoading(false)
    }, [isCheckFileLoading, isSubmitLoading])

    useEffect(() => {
        if (data?.txHash) {
            notify(`File signed, hash ${data.txHash}`, 'success')
        }
    }, [data])

    return { signTransaction, isLoading }
}
