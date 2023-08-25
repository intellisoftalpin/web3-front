import React, { type FC, useEffect, useState } from 'react'
import cls from './ThemeSwitcher.module.scss'
import classNames from 'classnames'
import { useTheme } from 'app/providers/ThemeProvider'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { toggleTheme, theme } = useTheme()

    const [themeChecked, setThemeChecked] = useState(true)

    useEffect(() => {
        setThemeChecked(theme === 'light' && true)
    }, [theme])

    return (
        <div className={classNames(cls.ThemeSwitcher, {}, [className])}>
            <div className={cls.toggleSwitch}>
                <label className={cls.label}>
                    <input
                        type='checkbox'
                        checked={themeChecked}
                        className={cls.input}
                        onChange={() => { setThemeChecked(!themeChecked) }}
                        onClick={toggleTheme}
                    />
                    <span className={cls.slider}/>
                </label>
            </div>
        </div>
    )
}
