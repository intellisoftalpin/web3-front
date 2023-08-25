import { AppRouter } from 'app/providers/AppRouter'
import 'app/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import classNames from 'classnames'
import { useTheme } from 'app/providers/ThemeProvider'
import { Navbar } from 'widgets/Navbar'
import { ToastContainer } from 'react-toastify'

export const App = () => {
    const { theme } = useTheme()
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
