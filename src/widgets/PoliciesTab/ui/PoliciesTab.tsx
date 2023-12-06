import { type FC } from 'react'
import cls from './PoliciesTab.module.scss'
import classNames from 'classnames'
import { ListPolicies } from 'entities/Policies'
import { CreatePolicyForm } from 'features/createPolicy'

interface PoliciesTabProps {
    className?: string
}

export const PoliciesTab: FC<PoliciesTabProps> = ({ className }) => {
    return (
        <div className={classNames(cls.PoliciesTab, {}, [className])}>
            <CreatePolicyForm className={cls.createPolicyForm}/>
            <div className={cls.listPoliciesBlock}>
                <ListPolicies/>
            </div>
        </div>
    )
}
