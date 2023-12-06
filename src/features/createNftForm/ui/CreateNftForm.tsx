import { type FC } from 'react'
import cls from './CreateNftForm.module.scss'
import classNames from 'classnames'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'

interface CreateNftFormProps {
    className?: string
}

export const CreateNftForm: FC<CreateNftFormProps> = ({ className }) => {
    return (
        <div className={classNames(cls.CreateNftForm, {}, [className])}>
            <h1 className={cls.header}>Create new nft</h1>
            <Input placeholder='Choose policy' type='text' labelText="Choose policy"/>
            <Input placeholder='Name' type='text' labelText='Name'/>
            <Input placeholder='Ticker' type='text' labelText='Ticker'/>
            <Input placeholder='Decimals' type='text' labelText='Decimals'/>
            <Input placeholder='Description' type='text' labelText='Description'/>
            <Input placeholder='Link homepage token' type='text' labelText='Link homepage token'/>
            <Button variant='outline'>
                <span>Create new nft</span>
            </Button>
        </div>
    )
}
