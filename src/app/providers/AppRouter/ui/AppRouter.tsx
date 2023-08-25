import { Route, Routes } from 'react-router-dom'
import { routesConfig } from 'shared/config/routesConfig/routesConfig'
import { Suspense } from 'react'

export const AppRouter = () => {
    return (
        <Suspense fallback="">
            <Routes>
                {Object.values(routesConfig).map(({ element, path }) => (
                    <Route
                        element={element}
                        key={path}
                        path={path}
                    />
                ))}
            </Routes>
        </Suspense>
    )
}
