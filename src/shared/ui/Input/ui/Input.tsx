import React, { forwardRef, type InputHTMLAttributes, type LegacyRef } from 'react'
import cls from './Input.module.scss'
import classNames from 'classnames'
import { type FieldError } from 'react-hook-form'

export type InputVariant = 'filled' | 'clear'

interface ValidationSchema {
    required?: boolean
    min?: number
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    variant?: InputVariant
    labelText?: string
    error?: FieldError
    invalid?: boolean
    validationSchema?: ValidationSchema
}

export const Input = forwardRef((props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
        className,
        variant = 'filled',
        labelText,
        error,
        invalid,
        validationSchema,
        ...otherProps
    } = props

    const required = error && error.type === 'required'
    const min = error && error.type === 'min'

    return (
        <div className={cls.inputBlock}>
            {labelText &&
                <div className={cls.labelBlock}>
                    <label>{labelText}</label>
                    {validationSchema?.required && '*'}
                </div>
            }
            <input
                className={classNames(cls.Input, { [cls.invalid]: invalid }, [className, cls[variant]])}
                {...otherProps} ref={ref}/>
            {required &&
                <span className={cls.validationError}>This field is required</span>
            }
            {min &&
                <span className={cls.validationError}>Minimal count is {validationSchema?.min}</span>
            }
        </div>
    )
})
