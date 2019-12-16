import { PageNotFound } from "../pages/errors"
import { BasicSearch }  from "../pages/Search"

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
            component: BasicSearch,
        },

        {
            auth: true,
            path: `${prefix}/*`,
            component: PageNotFound,
        },
    ]
)
