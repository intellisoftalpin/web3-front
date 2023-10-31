import { type FC, useCallback, useEffect, useState } from 'react'
import cls from './FileUpload.module.scss'
import classNames from 'classnames'
import { Upload } from 'shared/ui/Upload'
import { fileActions, FileInformation } from 'entities/File'
import { Button } from 'shared/ui/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface FileUploadProps {
    className?: string
}

export const FileUpload: FC<FileUploadProps> = ({ className }) => {
    const dispatch = useAppDispatch()
    const [file, setFile] = useState<File | null>(null)

    const addFile = useCallback(() => {
        if (file) {
            const { name, size, type, lastModified } = file
            dispatch(fileActions.setFile({ type, size, lastModified, hash: '121', name }))
        }
    }, [dispatch, file])

    useEffect(() => {
        addFile()
    }, [addFile])

    return (
        <div className={classNames(cls.FileUpload, {}, [className])}>
            <h1 className={cls.header}>File</h1>
            <Upload setFile={setFile}/>
            <FileInformation/>
            <Button>Create</Button>
        </div>
    )
}
