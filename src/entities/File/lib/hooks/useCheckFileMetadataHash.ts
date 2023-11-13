import { useCallback, useEffect } from 'react'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFile } from 'entities/File/model/selectors/getFile/getFile'
import { fileApi } from 'entities/File'
import { notify } from 'shared/lib/notify/notify'

export const useCheckFileMetadataHash = () => {
    const { name: fileName, hash: fileHash } = useAppSelector(getFile)
    const [getFileMetadata, { data, isLoading }] = fileApi.useGetFileMetadataMutation()

    const checkFileHash = useCallback(async () => {
        const data = await getFileMetadata({ key: '10337', value: fileHash }).unwrap()
        return data.length > 0
    }, [fileHash, getFileMetadata])

    useEffect(() => {
        if (data) {
            if (data.length > 0) {
                notify(`The file already signed, file name - ${fileName}`, 'info')
            } else {
                notify(`The file is not signed, file name - ${fileName}`, 'info')
            }
        }
        // eslint-disable-next-line
    }, [data])

    return { checkFileHash, isLoading }
}
