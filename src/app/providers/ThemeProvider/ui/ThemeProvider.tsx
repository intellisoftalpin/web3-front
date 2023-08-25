import React, { type FC, useMemo, useState } from 'react'
import { LOCAL_STORAGE_KEY_THEME, Theme, ThemeContext } from '../lib/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as Theme || Theme.LIGHT

export interface ThemeProviderProps {
    children: React.ReactElement
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)

    const defaultProps = useMemo(() => ({
        theme,
        setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}
