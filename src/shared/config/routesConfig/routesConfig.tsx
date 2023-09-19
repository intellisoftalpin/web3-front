import { type RouteObject } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { TradePage } from 'pages/TradePage'
import { Layout } from 'shared/ui/Layout/Layout'

export enum AppRoutes {
    TRADE = 'trade',
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.TRADE]: '/'
}

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: RoutesPath.trade,
                element: <TradePage/>
            }
        ]
    }
]
