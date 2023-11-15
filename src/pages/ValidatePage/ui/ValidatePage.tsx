import { type FC, useCallback } from 'react'
import cls from './ValidatePage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { FileInformation, useCheckFileMetadataHash } from 'entities/File'
import { Button } from 'shared/ui/Button'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { connectWalletActions } from 'features/connectWithWallet/model/slice/connectWalletSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface DocPageProps {
    className?: string
}

const DocPage: FC<DocPageProps> = ({ className }) => {
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)
    const fileHash = useAppSelector(getFileHash)
    const { checkFileHash: onCheckFileHash, isLoading, data, refreshFile } = useCheckFileMetadataHash()

    const onOpenConnectWallet = useCallback(() => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: true }))
    }, [dispatch])

    return (
        <div className={classNames(cls.DocPage, {}, [className])}>
            <div className={cls.fileUpload}>
                <h1 className={cls.header}>File</h1>
                {data.checked
                    ? <div className={cls.fileStatusBlock}>
                        <span className={classNames(cls.textMessage, [cls[data.validated ? 'success' : 'error']])}>{data.message}</span>
                    </div>
                    : <FileUpload/>
                }
                <FileInformation/>
                {connected
                    ? <Button onClick={data.checked ? refreshFile : onCheckFileHash} disabled={!fileHash || isLoading} variant='outline'>
                        {isLoading ? 'Pending...' : `${data.checked ? 'Validate another document' : 'Validate'}`}
                    </Button>
                    : <Button onClick={onOpenConnectWallet} variant='outline'>Connect to a wallet</Button>
                }
            </div>
        </div>
    )
}

export default DocPage
