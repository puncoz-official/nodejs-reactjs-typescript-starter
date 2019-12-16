import { FunctionComponent } from "react"
import { config }            from "../config"
import { PageNotFound }      from "../pages/errors"
import { Landing }           from "../pages/landing"
import adminRoutes           from "./adminRoutes"
import authRoutes            from "./authRoutes"

interface Route {
    redirect?: boolean
    path?: string
    exact?: boolean
    component?: FunctionComponent
    auth?: boolean
    from?: string
    to?: any
}

export const routes: Route[] = [
    {
        path: "/",
        exact: true,
        component: Landing,
    },

    ...authRoutes,
    ...adminRoutes(`/${config.app.adminRoutePrefix}`),

    {
        path: "*",
        component: PageNotFound,
    },
]
