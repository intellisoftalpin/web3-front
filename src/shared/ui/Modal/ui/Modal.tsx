import React, { type FC, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import cls from './Modal.module.scss'
import Close from 'shared/assets/icon/close.svg'
import classNames from 'classnames'

interface ModalProps {
    className?: string
    children: ReactNode
    opened: boolean
    onClose: (active: boolean) => void
}

const ANIMATION_DELAY = 150

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        children,
        opened,
        onClose
    } = props

    const [isClosing, setIsClosing] = useState<boolean>(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeModal = useCallback(() => {
        setIsClosing(true)
        timerRef.current = setTimeout(() => {
            onClose(false)
            setIsClosing(false)
        }, ANIMATION_DELAY)
    }, [onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal()
        }
    }, [closeModal])

    useEffect(() => {
        if (opened) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            clearTimeout(timerRef.current)
        }
    }, [onKeyDown, opened])

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div className={classNames(cls.Modal, {
            [cls.opened]: opened,
            [cls.closed]: isClosing
        })} onClick={closeModal}>
            <div className={cls.overlay}>
                <div className={classNames(cls.content, [className])} onClick={onContentClick}>
                    <div className={cls.closeIcon} onClick={closeModal}>
                        <Close className={cls.close}/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
