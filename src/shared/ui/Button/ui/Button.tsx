import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react'
import cls from './Button.module.scss'
import classNames from 'classnames'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    children: ReactNode
}

export const Button: FC<ButtonProps> = (props) => {
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
}
