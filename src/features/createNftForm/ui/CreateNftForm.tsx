import { type FC } from 'react'
import cls from './CreateNftForm.module.scss'
import classNames from 'classnames'
import { Button } from 'shared/ui/Button'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { type FormNftSchema } from '../model/types/NftSchema'
import { toast } from 'react-toastify'
import { createNFT } from '../lib/transaction'
import { Input } from 'shared/ui/Input'
import { CheckAuthButton } from 'widgets/CheckAuthButton'

interface CreateNftFormProps {
    className?: string
}

export const CreateNftForm: FC<CreateNftFormProps> = ({ className }) => {
    const { control, handleSubmit, reset } = useForm<FormNftSchema>({
        defaultValues: {
            policy: '',
            decimals: 1,
            name: '',
            ticker: '',
            description: '',
            linkHomepage: ''
        }
    })

    const onSubmit: SubmitHandler<FormNftSchema> = async (data) => {
        await createNFT(data)
            .then(() => toast('Success: NFT successfully created', { type: 'success' }))
            // .catch(() => toast('Failure: Error created nft', { type: 'error' }))
            .catch(console.error)
        reset()
    }

    return (
        <form className={classNames(cls.CreateNftForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={cls.header}>Create new nft</h1>
            <Controller name='name' control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error, invalid } }) =>
                    <Input {...field} placeholder='Name' type='text'
                        labelText='Name' error={error} invalid={invalid}
                        validationSchema={{ required: true }}
                    />}
            />
            <Controller name='ticker' control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error, invalid } }) =>
                    <Input {...field} placeholder='Ticker' type='text'
                        labelText='Ticker' error={error} invalid={invalid}
                        validationSchema={{ required: true }}
                    />}
            />
            <Controller name='description' control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error, invalid } }) =>
                    <Input {...field} placeholder='Description' type='text'
                        labelText='Description' error={error} invalid={invalid}
                        validationSchema={{ required: true }}
                    />}
            />
            <CheckAuthButton>
                <Button variant='outline' type='submit'>
                    <span>Create new nft</span>
                </Button>
            </CheckAuthButton>
        </form>
    )
}
