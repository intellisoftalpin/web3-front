import { memo, useCallback, useEffect, useState } from 'react'
import cls from './FileUpload.module.scss'
import classNames from 'classnames'
import { Upload } from 'shared/ui/Upload'
import { fileActions, hashFile } from 'entities/File'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface FileUploadProps {
    className?: string
}

export const FileUpload = memo((props: FileUploadProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const [file, setFile] = useState<File | null>(null)

    const addFile = useCallback(async () => {
        if (file) {
            const { name, size, type, lastModified } = file
            const hash = await hashFile(file)
            dispatch(fileActions.setFile({ type, size, lastModified, hash, name }))
        }
    }, [dispatch, file])

    useEffect(() => {
        void addFile()
    }, [addFile])

    return (
        <div className={classNames(cls.FileUpload, {}, [className])}>
            <Upload setFile={setFile}/>
        </div>
    )
})
