import { AppRouter } from 'app/providers/AppRouter'
import 'app/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import classNames from 'classnames'
import { useTheme } from 'app/providers/ThemeProvider'
import { Navbar } from 'widgets/Navbar'
import { ToastContainer } from 'react-toastify'
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
            <Navbar/>
            <AppRouter/>
            <ToastContainer
                theme={theme}
                bodyClassName='body-toast'
                toastClassName='toast'
                autoClose={8000}
                pauseOnHover
                newestOnTop
            />
        </div>
    )
}
