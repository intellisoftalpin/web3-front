import { type FC } from 'react'
import cls from './DelegatePage.module.scss'
import classNames from 'classnames'
import { Delegation } from 'widgets/Delegation'

interface DelegatePageProps {
    className?: string
}

const DelegatePage: FC<DelegatePageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.DelegatePage, {}, [className])}>
            <Delegation/>
        </div>
    )
}

export default DelegatePage
