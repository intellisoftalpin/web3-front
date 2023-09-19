import { AppRouter } from 'app/providers/AppRouter'
import 'app/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import classNames from 'classnames'
import { useTheme } from 'app/providers/ThemeProvider'
import { useEffect } from 'react'

export const App = () => {
    const { theme } = useTheme()

    useEffect(() => {
        document.title = window?._env_?.TITLE || process.env.TITLE
        document.querySelector('meta[name="description"]')
            ?.setAttribute('content', window?._env_?.DESCRIPTION || process.env.DESCRIPTION)
    }, [])

    return (
        <div className={classNames('App', theme)}>
            <AppRouter/>
        </div>

    )
}
