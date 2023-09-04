import { type RouteProps } from 'react-router-dom'
import { NotFoundPage } from 'pages/NotFoundPage'
import { TradePage } from 'pages/TradePage'

export enum AppRoutes {
    TRADE = 'trade',
    NOT_FOUND = 'not_found'
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.TRADE]: '/',
    [AppRoutes.NOT_FOUND]: '*'
}

export const routesConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.TRADE]: {
        path: RoutesPath.trade,
        element: <TradePage/>
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutesPath.not_found,
        element: <NotFoundPage/>
    }
}
