import { type FC } from 'react'
import cls from './FileInformation.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFile } from '../model/selectors/getFile/getFile'

interface FileInformationProps {
    className?: string
}

export const FileInformation: FC<FileInformationProps> = ({ className }) => {
    const { name, hash, type, lastModified, size } = useAppSelector(getFile)

    return (
        <div className={classNames(cls.FileInformation, {}, [className])}>
            <div className={cls.informationItem}>
                <span>Name</span>
                <span>{name}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Hash</span>
                <span>{hash}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Type</span>
                <span>{type}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Size</span>
                <span>{size && `${(size / 1024).toFixed(0)}kb`}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Last Modified</span>
                <span>{lastModified && new Date(lastModified).toLocaleString()}</span>
            </div>
        </div>
    )
}
