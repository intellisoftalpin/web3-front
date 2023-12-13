import { type FC } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'
import cls from './CreateTokenForm.module.scss'
import classNames from 'classnames'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { type FormCreateToken } from '../model/types/createTokenSchema'
import { createToken } from '../lib/transaction'
import { toast } from 'react-toastify'
import { CheckAuthButton } from 'widgets/CheckAuthButton'

interface CreateTokenFormProps {
    className?: string
}

export const CreateTokenForm: FC<CreateTokenFormProps> = ({ className }) => {
    const { control, handleSubmit, reset } = useForm<FormCreateToken>({
        defaultValues: {
            policy: '',
            decimals: 1,
            name: '',
            supply: 1,
            ticker: '',
            description: '',
            linkHomepage: ''
        }
    })

    const onSubmit: SubmitHandler<FormCreateToken> = async (data) => {
        await createToken(data)
            .then(() => toast('Success: Token successfully created', { type: 'success' }))
            .catch(() => toast('Failure: Error created token', { type: 'error' }))
        reset()
    }

    return (
        <form className={classNames(cls.CreateTokenForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={cls.header}>Create new token</h1>
            <Controller name='name' control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error, invalid } }) =>
                    <Input {...field} placeholder='Name' type='text'
                        labelText='Name' error={error} invalid={invalid}
                        validationSchema={{ required: true }}
                    />}
            />
            <Controller name='supply' control={control}
                rules={{ required: true, min: 1 }}
                render={({ field, fieldState: { error, invalid } }) =>
                    <Input {...field} placeholder='Total supply' type='number'
                        labelText='Total supply' error={error} invalid={invalid}
                        validationSchema={{ required: true, min: 1 }}
                    />}
            />
            <CheckAuthButton>
                <Button variant='outline' type='submit'>
                    <span>Create new token</span>
                </Button>
            </CheckAuthButton>
        </form>
    )
}
