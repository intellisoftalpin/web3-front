import { useTheme } from 'app/providers/ThemeProvider'
import { Navbar } from 'widgets/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppDescription } from 'widgets/AppDescription'
import { memo } from 'react'

export const Layout = memo(() => {
    const { theme } = useTheme()

    return (
        <>
            <Navbar/>
            <AppDescription/>
            <Outlet/>
            <ToastContainer
                theme={theme}
                bodyClassName='body-toast'
                toastClassName='toast'
                autoClose={8000}
                pauseOnHover
                newestOnTop
            />
        </>
    )
})
