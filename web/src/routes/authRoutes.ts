import {
    Login,
    Register,
} from "../pages/auth"

export default [
    {
        path: "/login",
        exact: true,
        component: Login,
    },

    {
        path: "/register",
        exact: true,
        component: Register,
    },
]
