import { memo, useCallback, useEffect, useState } from 'react'
import cls from './FileUpload.module.scss'
import classNames from 'classnames'
import { Upload } from 'shared/ui/Upload'
import { fileActions, FileInformation, hashFile } from 'entities/File'
import { Button } from 'shared/ui/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { connectWalletActions } from 'features/connectWithWallet/model/slice/connectWalletSlice'

interface FileUploadProps {
    className?: string
    actionName: string
    onPerformAction: () => void
    loading?: boolean
}

export const FileUpload = memo((props: FileUploadProps) => {
    const { onPerformAction, actionName, className, loading } = props
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)
    const fileHash = useAppSelector(getFileHash)
    const [file, setFile] = useState<File | null>(null)

    const onOpenConnectWallet = useCallback(() => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: true }))
    }, [dispatch])

    const addFile = useCallback(async () => {
        if (file) {
            const { name, size, type, lastModified } = file
            const hash = await hashFile(file)
            dispatch(fileActions.setFile({ type, size, lastModified, hash, name }))
        }
    }, [dispatch, file])

    useEffect(() => {
        void addFile()
    }, [addFile])

    return (
        <div className={classNames(cls.FileUpload, {}, [className])}>
            <h1 className={cls.header}>File</h1>
            <Upload setFile={setFile}/>
            <FileInformation/>
            {connected
                ? <Button onClick={onPerformAction} disabled={!fileHash || loading} variant='outline'>{loading ? 'Pending...' : actionName}</Button>
                : <Button onClick={onOpenConnectWallet} variant='outline'>Connect to a wallet</Button>
            }
        </div>
    )
})
