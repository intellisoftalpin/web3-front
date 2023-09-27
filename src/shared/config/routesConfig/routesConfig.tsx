import { type RouteObject } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { TradePage } from 'pages/TradePage'
import { Layout } from 'app/providers/Layout'
import { DelegatePage } from 'pages/DalegatePage'

export enum AppRoutes {
    TRADE = 'trade',
    DELEGATE = 'delegate'
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.TRADE]: '/',
    [AppRoutes.DELEGATE]: 'delegate'
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
            },
            {
                path: RoutesPath.delegate,
                element: <DelegatePage/>
            }
        ]
    }
]
