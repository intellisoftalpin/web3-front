import { type FC } from 'react'
import cls from './UploadPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'

interface UploadPageProps {
    className?: string
}

const UploadPage: FC<UploadPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.UploadPage, {}, [className])}>
            <FileUpload/>
        </div>
    )
}

export default UploadPage
