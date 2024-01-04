import { type FC } from 'react'
import cls from './SignPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { FileInformation, useSignFile } from 'entities/File'
import { Button } from 'shared/ui/Button'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { explorerTransactionsLink } from 'shared/consts/env'
import { CheckAuthButton } from 'widgets/CheckAuthButton'
import { AppDescription } from 'widgets/AppDescription'

interface UploadPageProps {
    className?: string
}

const SignPage: FC<UploadPageProps> = ({ className }) => {
    const { signTransaction: onSignTransaction, isLoading, conductData, refreshData } = useSignFile()
    const fileHash = useAppSelector(getFileHash)

    return (
        <div className={classNames(cls.UploadPage, {}, [className])}>
            <AppDescription/>
            <div className={cls.fileUpload}>
                <h1 className={cls.header}>File</h1>
                {conductData.isConduct
                    ? <div className={cls.fileStatusBlock}>
                        <span className={cls.textMessage}>{conductData.message}</span>
                        <a href={`${explorerTransactionsLink}${conductData.hash}`} target='_blank' rel="noreferrer">Explorer link</a>
                    </div>
                    : <FileUpload/>
                }
                <FileInformation/>
                <CheckAuthButton>
                    <Button onClick={conductData.isConduct ? refreshData : onSignTransaction} disabled={!fileHash || isLoading} variant='outline'>
                        {isLoading ? 'Pending...' : `${conductData.isConduct ? 'Sign another document' : 'Sign'}`}
                    </Button>
                </CheckAuthButton>
            </div>
        </div>
    )
}

export default SignPage
