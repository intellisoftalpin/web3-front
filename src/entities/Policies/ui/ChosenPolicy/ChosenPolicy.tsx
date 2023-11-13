import { type FC } from 'react'
import cls from './ChosenPolicy.module.scss'
import classNames from 'classnames'

interface ChosenPolicyProps {
    className?: string
}

export const ChosenPolicy: FC<ChosenPolicyProps> = ({ className }) => {
    return (
        <div className={classNames(cls.ChosenPolicy, {}, [className])}>

        </div>
    )
}
