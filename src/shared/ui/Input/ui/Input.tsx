import React, { type InputHTMLAttributes, memo, useRef } from 'react'
import cls from './Input.module.scss'
import classNames from 'classnames'

export type InputVariant = 'clear'
export type InputMode = 'decimal' | 'text'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    variant?: InputVariant
    mode?: InputMode
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        variant = 'clear',
        mode = 'text',
        ...otherProps
    } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const setOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (mode === 'decimal') {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault()
            }
        }
    }

    return (
        <input
            ref={inputRef}
            onKeyPress={setOnlyNumbers}
            className={classNames(cls.Input, {}, [className, cls[variant]])}
            {...otherProps}/>
    )
})
