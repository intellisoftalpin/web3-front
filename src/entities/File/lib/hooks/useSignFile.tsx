import { useCheckFileMetadataHash } from './useCheckFileMetadataHash'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { useCallback, useEffect, useState } from 'react'
import { fileActions, fileApi, signFile } from 'entities/File'
import { toast } from 'react-toastify'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ConductData {
    isConduct: boolean
    hash: string
    message: string
}

const defaultConductData: ConductData = {
    isConduct: false,
    hash: '',
    message: ''
}

export const useSignFile = () => {
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(false)
    const [conductData, setConductData] = useState<ConductData>(defaultConductData)
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
            toast('Failure: The provided document has already been signed', { type: 'error' })
            setLoading(false)
        }
    }, [checkFileHash, fileHash, submitTransaction])

    const refreshData = useCallback(() => {
        dispatch(fileActions.refreshFile())
        setConductData(defaultConductData)
    }, [dispatch])

    useEffect(() => {
        if (data?.txHash) {
            setConductData({ isConduct: true, message: 'Success: The document was successfully signed', hash: data.txHash })
        }
    }, [data])

    return { signTransaction, isLoading, conductData, refreshData }
}
