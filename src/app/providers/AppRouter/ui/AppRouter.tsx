import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routesConfig } from 'shared/config/routesConfig/routesConfig'

const router = createBrowserRouter(routesConfig)

export const AppRouter = () => {
    return (
        <Suspense fallback="">
            <RouterProvider router={router}/>
        </Suspense>
    )
}
