import { PageNotFound } from "../pages/errors"
import {
    Search,
    SearchResult,
}                       from "../pages/Search"

export default (prefix: string) => ([
        {
            redirect: true,
            exact: true,
            from: prefix,
            to: `${prefix}/search`,
        },

        {
            auth: true,
            path: `${prefix}/search`,
            exact: true,
            component: Search,
        },

        {
            auth: true,
            path: `${prefix}/search/result`,
            exact: true,
            component: SearchResult,
        },

        {
            auth: true,
            path: `${prefix}/*`,
            component: PageNotFound,
        },
    ]
)
