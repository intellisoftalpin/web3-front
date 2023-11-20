import { type FC } from 'react'
import cls from './FileInformation.module.scss'
import classNames from 'classnames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getFile } from '../model/selectors/getFile/getFile'
import { formatBytes } from 'shared/lib/formatBytes/formatBytes'

interface FileInformationProps {
    className?: string
}

export const FileInformation: FC<FileInformationProps> = ({ className }) => {
    const { name, hash, type, lastModified, size } = useAppSelector(getFile)

    return (
        <div className={classNames(cls.FileInformation, {}, [className])}>
            <div className={cls.informationItem}>
                <span>Name</span>
                <span className={cls.informationCurrentItem}>{name}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Hash</span>
                <span className={cls.informationCurrentItem}>{hash}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Type</span>
                <span className={cls.informationCurrentItem}>{type}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Size</span>
                <span className={cls.informationCurrentItem}>{size && formatBytes(size)}</span>
            </div>
            <div className={cls.informationItem}>
                <span>Last Modified</span>
                <span className={cls.informationCurrentItem}>{lastModified && new Date(lastModified).toLocaleString()}</span>
            </div>
        </div>
    )
}
