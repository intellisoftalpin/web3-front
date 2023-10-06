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

const defaultRoutes = [
    {
        id: 'buy',
        path: RoutesPath.trade,
        element: <TradePage/>,
        errorElement: <NotFoundPage/>
    },
    {
        id: 'delegate',
        path: RoutesPath.delegate,
        element: <DelegatePage/>,
        errorElement: <NotFoundPage/>
    }
]

export function createRoutes (): RouteObject[] {
    if (window?._env_?.ACTIONS === '' || window?._env_?.ACTIONS === undefined) return defaultRoutes
    return window?._env_?.ACTIONS.split(' ').join('').split(',').map(item => defaultRoutes.find(defRoute => defRoute.id === item))
}

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children: createRoutes()
    }
]
