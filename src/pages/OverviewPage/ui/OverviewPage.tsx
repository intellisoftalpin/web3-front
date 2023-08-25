import { type FC } from 'react'
import cls from './OverviewPage.module.scss'
import classNames from 'classnames'
import { TransactionList } from 'entities/Transaction'

interface MainPageProps {
    className?: string
}

const OverviewPage: FC<MainPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.OverviewPage, {}, [className])}>
            <TransactionList/>
        </div>
    )
}

export default OverviewPage
