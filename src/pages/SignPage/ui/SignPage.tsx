import { type FC, useCallback } from 'react'
import cls from './SignPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { signFile } from 'entities/File'

interface UploadPageProps {
    className?: string
}

const SignPage: FC<UploadPageProps> = ({ className }) => {
    const fileHash = useAppSelector(getFileHash)
    const onSignFile = useCallback(async () => {
        await signFile(fileHash)
    }, [fileHash])

    return (
        <div className={classNames(cls.UploadPage, {}, [className])}>
            <FileUpload actionName='Sign' onPerformAction={onSignFile}/>
        </div>
    )
}

export default SignPage
