import { type DataRouteObject, type RouteObject } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { TradePage } from 'pages/TradePage'
import { Layout } from 'app/providers/Layout'
import { DelegatePage } from 'pages/DalegatePage'
import { SignPage } from 'pages/SignPage'
import { DocPage } from 'pages/DocPage'

export enum AppRoutes {
    TRADE = 'trade',
    DELEGATE = 'delegate',
    SIGN = 'sign',
    DOC = 'doc'
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.TRADE]: 'buy',
    [AppRoutes.DELEGATE]: 'delegate',
    [AppRoutes.SIGN]: 'sign',
    [AppRoutes.DOC]: 'doc'
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
        id: 'doc',
        path: RoutesPath.doc,
        element: <DocPage/>,
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
