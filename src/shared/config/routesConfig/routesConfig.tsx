import { type DataRouteObject, type RouteObject } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { TradePage } from 'pages/TradePage'
import { Layout } from 'app/providers/Layout'
import { DelegatePage } from 'pages/DalegatePage'
import { SignPage } from 'pages/SignPage'
import { TokensPage } from 'pages/TokensPage'
import { ValidatePage } from 'pages/ValidatePage'
import { TokenPage } from 'pages/TokenPage'

export enum AppRoutes {
    TRADE = 'trade',
    DELEGATE = 'delegate',
    SIGN = 'sign',
    VALIDATE = 'validate',
    TOKENS = 'tokens',
    TOKEN = 'token'
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.TRADE]: 'buy',
    [AppRoutes.DELEGATE]: 'delegate',
    [AppRoutes.SIGN]: 'sign',
    [AppRoutes.VALIDATE]: 'validate',
    [AppRoutes.TOKENS]: 'tokens',
    [AppRoutes.TOKEN]: 'token'
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
    },
    {
        id: 'sign',
        path: RoutesPath.sign,
        element: <SignPage/>,
        errorElement: <NotFoundPage/>
    },
    {
        id: 'validate',
        path: RoutesPath.validate,
        element: <ValidatePage/>,
        errorElement: <NotFoundPage/>
    },
    {
        id: 'tokens',
        path: RoutesPath.tokens,
        element: <TokensPage/>,
        errorElement: <NotFoundPage/>
    },
    {
        id: 'token',
        path: RoutesPath.token,
        element: <TokenPage/>,
        errorElement: <NotFoundPage/>
    }
]

export function createRoutes (): DataRouteObject[] {
    if (window?._env_?.ACTIONS === '' || window?._env_?.ACTIONS === undefined) {
        return defaultRoutes.map((item, index) => {
            if (index === 0) {
                item.path = '/'
            }
            return item
        })
    }
    const actions = window?._env_?.ACTIONS.split(' ').join('').split(',')

    const routes = actions.map((item, index) => {
        const route = defaultRoutes.find(defRoute => defRoute.id === item)
        if (actions.length === 1 && route) route.path = '/'
        else if (index === 0 && route) route.path = '/'
        return route
    })

    return routes as DataRouteObject[]
}

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children: createRoutes()
    }
]
