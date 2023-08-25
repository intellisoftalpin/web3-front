import { useContext } from 'react'
import { LOCAL_STORAGE_KEY_THEME, Theme, ThemeContext } from './ThemeContext'

interface useThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export function useTheme (): useThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        setTheme(newTheme)
        localStorage.setItem(LOCAL_STORAGE_KEY_THEME, newTheme)
    }

    return {
        toggleTheme,
        theme
    }
}
