import { type ButtonHTMLAttributes, memo, type ReactNode } from 'react'
import cls from './Button.module.scss'
import classNames from 'classnames'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    children: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'filled',
        ...otherProps
    } = props

    return (
        <button
            className={classNames(cls.Button, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </button>
    )
})
