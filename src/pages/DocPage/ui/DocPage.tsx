import { type FC, useCallback } from 'react'
import cls from './DocPage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { checkFileHash } from 'entities/File'

interface DocPageProps {
    className?: string
}

const DocPage: FC<DocPageProps> = ({ className }) => {
    const fileHash = useAppSelector(getFileHash)
    const onCheckFileHash = useCallback(async () => {
        await checkFileHash(fileHash)
    }, [fileHash])

    return (
        <div className={classNames(cls.DocPage, {}, [className])}>
            <FileUpload onPerformAction={onCheckFileHash} actionName='Doc'/>
        </div>
    )
}

export default DocPage
