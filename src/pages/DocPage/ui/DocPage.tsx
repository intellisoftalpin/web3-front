import { type FC } from 'react'
import cls from './DocPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { useCheckFileMetadataHash } from 'entities/File'

interface DocPageProps {
    className?: string
}

const DocPage: FC<DocPageProps> = ({ className }) => {
    const { checkFileHash: onCheckFileHash, isLoading } = useCheckFileMetadataHash()

    return (
        <div className={classNames(cls.DocPage, {}, [className])}>
            <FileUpload onPerformAction={onCheckFileHash} actionName='Doc' loading={isLoading}/>
        </div>
    )
}

export default DocPage
