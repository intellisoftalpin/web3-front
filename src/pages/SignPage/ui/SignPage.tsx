import { type FC } from 'react'
import cls from './SignPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { useSignFile } from 'entities/File'

interface UploadPageProps {
    className?: string
}

const SignPage: FC<UploadPageProps> = ({ className }) => {
    const { signTransaction: onSignTransaction, isLoading } = useSignFile()

    return (
        <div className={classNames(cls.UploadPage, {}, [className])}>
            <FileUpload actionName='Sign' onPerformAction={onSignTransaction} loading={isLoading}/>
        </div>
    )
}

export default SignPage
