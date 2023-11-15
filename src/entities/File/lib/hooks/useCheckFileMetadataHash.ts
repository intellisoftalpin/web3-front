import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { fileActions } from '../../model/slice/fileSlice'
import { fileApi } from '../../api/fileApi'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

export interface fileChecked {
    checked: boolean
    message: string
    validated: boolean
}

const defaultData: fileChecked = {
    checked: false,
    message: '',
    validated: false
}

export const useCheckFileMetadataHash = () => {
    const [data, setData] = useState<fileChecked>(defaultData)
    const dispatch = useAppDispatch()
    const fileHash = useAppSelector(getFileHash)
    const [getFileMetadata, { data: fileMetadata, isLoading }] = fileApi.useGetFileMetadataMutation()

    const checkFileHash = useCallback(async () => {
        const data = await getFileMetadata({ key: '10337', value: fileHash }).unwrap()
        return data.length > 0
    }, [fileHash, getFileMetadata])

    const refreshFile = useCallback(() => {
        setData(defaultData)
        dispatch(fileActions.refreshFile())
    }, [dispatch])

    useEffect(() => {
        if (fileMetadata) {
            if (fileMetadata.length > 0) {
                setData({ checked: true, message: 'Success: Provided file was successfully validated, as it was properly signed', validated: true })
            } else {
                setData({ checked: true, message: 'Failure: Provided file was not signed yet or the  content of the file is modified or corrupted', validated: false })
            }
        }
    }, [fileMetadata])

    return { checkFileHash, refreshFile, isLoading, data }
}
