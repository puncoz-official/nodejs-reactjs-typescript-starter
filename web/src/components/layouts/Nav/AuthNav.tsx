import React, {
    Fragment,
    FunctionComponent,
    MouseEvent,
    useCallback,
    useMemo,
}                    from "react"
import {
    useDispatch,
    useSelector,
}                    from "react-redux"
import { Link }      from "react-router-dom"
import { config }    from "../../../config"
import { logout }    from "../../../stores/actions/authActions"
import { RootState } from "../../../stores/types"

const AuthNav: FunctionComponent = () => {
    const adminRoutePrefix = useMemo(() => config.app.adminRoutePrefix, [])
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()

    const handleLogout = useCallback((event: MouseEvent) => {
        event.preventDefault()

        dispatch(logout())
    }, [dispatch])

    return (
        <Fragment>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to={`/${adminRoutePrefix}/search`} className="nav-link">
                        Search
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <Link to="/" className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Welcome, {user.display_name}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link to="/" className="dropdown-item" onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>
                </li>
            </ul>
        </Fragment>
    )
}

export default AuthNav
