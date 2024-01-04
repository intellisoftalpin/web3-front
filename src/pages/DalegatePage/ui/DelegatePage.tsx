import { memo } from 'react'
import cls from './DelegatePage.module.scss'
import classNames from 'classnames'
import { Delegation } from 'widgets/Delegation'
import { AppDescription } from 'widgets/AppDescription'

interface DelegatePageProps {
    className?: string
}

const DelegatePage = memo(({ className }: DelegatePageProps) => {
    return (
        <div className={classNames(cls.DelegatePage, {}, [className])}>
            <AppDescription/>
            <Delegation/>
        </div>
    )
})

export default DelegatePage
