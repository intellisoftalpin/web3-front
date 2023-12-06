import { type FC } from 'react'
import cls from './CreatePolicyForm.module.scss'
import classNames from 'classnames'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'

interface CreatePolicyFormProps {
    className?: string
}

export const CreatePolicyForm: FC<CreatePolicyFormProps> = ({ className }) => {
    return (
        <div className={classNames(cls.CreatePolicyForm, {}, [className])}>
            <h1 className={cls.header}>Create new policy</h1>
            <Input placeholder='Name' type='text' labelText="Name"/>
            <Input placeholder='Expired date' type='date' labelText='Expired date'/>
            <Input placeholder='any' mode='decimal' labelText='Any'/>
            <Button variant='outline'>
                <span>Create new policy</span>
            </Button>
        </div>
    )
}
