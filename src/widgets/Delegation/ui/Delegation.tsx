import { type FC } from 'react'
import cls from './Delegation.module.scss'
import classNames from 'classnames'
import { DelegationPool } from 'entities/DelegationPool'

interface DelegationProps {
    className?: string
}

export const Delegation: FC<DelegationProps> = ({ className }) => {
    return (
        <div className={classNames(cls.Delegation, {}, [className])}>
            <DelegationPool/>
        </div>
    )
}
