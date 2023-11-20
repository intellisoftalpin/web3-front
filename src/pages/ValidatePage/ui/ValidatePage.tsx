import { type FC } from 'react'
import cls from './ValidatePage.module.scss'
import classNames from 'classnames'
import { FileUpload } from 'widgets/FileUpload'
import { FileInformation, useCheckFileMetadataHash } from 'entities/File'
import { Button } from 'shared/ui/Button'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFileHash } from 'entities/File/model/selectors/gitFileHash/getFileHash'
import { explorerTransactionsLink } from 'shared/consts/env'

interface DocPageProps {
    className?: string
}

const DocPage: FC<DocPageProps> = ({ className }) => {
    const fileHash = useAppSelector(getFileHash)
    const { checkFileHash: onCheckFileHash, isLoading, data, refreshFile } = useCheckFileMetadataHash()

    return (
        <div className={classNames(cls.DocPage, {}, [className])}>
            <div className={cls.fileUpload}>
                <h1 className={cls.header}>File</h1>
                {data.checked
                    ? <div className={cls.fileStatusBlock}>
                        <span className={classNames(cls.textMessage, [cls[data.validated ? 'success' : 'error']])}>
                            {data.message}
                        </span>
                        {data.hash &&
                            <a href={`${explorerTransactionsLink}${data.hash}`} target='_blank' rel="noreferrer">
                                Explorer link
                            </a>
                        }
                    </div>
                    : <FileUpload/>
                }
                <FileInformation/>
                <Button onClick={data.checked ? refreshFile : onCheckFileHash} disabled={!fileHash || isLoading}
                    variant='outline'>
                    {isLoading ? 'Pending...' : `${data.checked ? 'Validate another document' : 'Validate'}`}
                </Button>
            </div>
        </div>
    )
}

export default DocPage
