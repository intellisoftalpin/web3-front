import { type FC } from 'react'
import cls from './Tooltip.module.scss'
import classNames from 'classnames'
import TooltipIcon from 'shared/assets/icon/tooltip.svg'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface TooltipProps {
    id: string
    className?: string
    text: string
}

export const Tooltip: FC<TooltipProps> = (props) => {
    const { id, text, className } =
        props

    return (
        <div className={classNames(cls.Tooltip, {}, [className])}>
            <TooltipIcon className={cls.tooltipIcon} data-tooltip-id={id}/>
            <ReactTooltip id={id} className={cls.tooltipText} opacity={1}>
                <span>{text}</span>
            </ReactTooltip>
        </div>
    )
}
