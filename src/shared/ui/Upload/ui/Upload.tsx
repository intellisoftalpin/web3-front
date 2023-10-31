import { type FC, useEffect } from 'react'
import cls from './Upload.module.scss'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'

interface UploadProps {
    className?: string
    setFile: (file: File) => void
}

export const Upload: FC<UploadProps> = ({ className, setFile }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ multiple: false })

    useEffect(() => {
        if (acceptedFiles.length === 1) {
            setFile(acceptedFiles[0])
        }
    }, [acceptedFiles, setFile])

    return (
        <div className={classNames(cls.Upload, {}, [className])} {...getRootProps()}>
            <input {...getInputProps()}/>
            <span className={cls.text}>Drag 'n' drop file here, or click to select file</span>
        </div>
    )
}
