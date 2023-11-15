import { type FC, useCallback } from 'react'
import cls from './SignPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { FileInformation, useSignFile } from 'entities/File'
import { Button } from 'shared/ui/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { connectWalletActions } from 'features/connectWithWallet/model/slice/connectWalletSlice'

interface UploadPageProps {
    className?: string
}

const SignPage: FC<UploadPageProps> = ({ className }) => {
    const { signTransaction: onSignTransaction, isLoading } = useSignFile()
    const dispatch = useAppDispatch()
    const { connected } = useAppSelector(getAuth)
    const fileHash = useAppSelector(getFileHash)

    const onOpenConnectWallet = useCallback(() => {
        dispatch(connectWalletActions.openWalletModal({ isOpen: true }))
    }, [dispatch])

    return (
        <div className={classNames(cls.UploadPage, {}, [className])}>
            <div className={cls.fileUpload}>
                <h1 className={cls.header}>File</h1>
                <FileUpload/>
                <FileInformation/>
                {connected
                    ? <Button onClick={onSignTransaction} disabled={!fileHash || isLoading} variant='outline'>{isLoading ? 'Pending...' : 'Sign'}</Button>
                    : <Button onClick={onOpenConnectWallet} variant='outline'>Connect to a wallet</Button>
                }
            </div>
        </div>
    )
}

export default SignPage
