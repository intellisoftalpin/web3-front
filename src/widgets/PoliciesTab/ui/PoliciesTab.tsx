import { type FC } from 'react'
import cls from './PoliciesTab.module.scss'
import classNames from 'classnames'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { ListPolicies } from 'entities/Policies'

interface PoliciesTabProps {
    className?: string
}

export const PoliciesTab: FC<PoliciesTabProps> = ({ className }) => {
    return (
        <div className={classNames(cls.PoliciesTab, {}, [className])}>
            <div className={cls.createPolicyForm}>
                <h1 className={cls.header}>Create new policy</h1>
                <Input placeholder='Name' type='text' labelText="Name"/>
                <Input placeholder='Expired date' type='date' labelText='Expired date'/>
                <Input placeholder='any' mode='decimal' labelText='Any'/>
                <Button variant='outline'>
                    <span>Create new policy</span>
                </Button>
            </div>
            <ListPolicies/>
        </div>
    )
}
