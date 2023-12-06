import { type FC } from 'react'
import cls from './CreateTokenForm.module.scss'
import classNames from 'classnames'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'

interface CreateTokenFormProps {
    className?: string
}

export const CreateTokenForm: FC<CreateTokenFormProps> = ({ className }) => {
    return (
        <div className={classNames(cls.CreateTokenForm, {}, [className])}>
            <h1 className={cls.header}>Create new token</h1>
            <Input placeholder='Choose policy' type='text' labelText="Choose policy"/>
            <Input placeholder='Name' type='text' labelText='Name'/>
            <Input placeholder='Ticker' type='text' labelText='Ticker'/>
            <Input placeholder='Decimals' type='text' labelText='Decimals'/>
            <Input placeholder='Total supply' type='text' labelText='Total supply'/>
            <Input placeholder='Description' type='text' labelText='Description'/>
            <Input placeholder='Link homepage token' type='text' labelText='Link homepage token'/>
            <Button variant='outline'>
                <span>Create new token</span>
            </Button>
        </div>
    )
}
