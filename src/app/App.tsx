import { AppRouter } from 'app/providers/AppRouter'
import 'app/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import classNames from 'classnames'
import { useTheme } from 'app/providers/ThemeProvider'
import { useEffect } from 'react'
import { title } from 'shared/consts/env'

export const App = () => {
    const { theme } = useTheme()

    useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')
            ?.setAttribute('content', window?._env_?.DESCRIPTION || process.env.DESCRIPTION || 'Web3 app')
    }, [])

    return (
        <div className={classNames('App', theme)}>
            <AppRouter/>
        </div>

    )
}
