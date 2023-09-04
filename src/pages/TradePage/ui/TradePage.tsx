import { type FC } from 'react'
import cls from './TradePage.module.scss'
import classNames from 'classnames'
import { Trade } from 'widgets/Trade'
import { TransactionList } from 'entities/Transaction'

interface SwapPageProps {
    className?: string
}

const TradePage: FC<SwapPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.TradePage, {}, [className])}>
            <Trade/>
            <TransactionList/>
        </div>
    )
}

export default TradePage
