import React, { FunctionComponent } from "react"
import { useSelector }              from "react-redux"
import {
    Redirect,
    Route,
    RouteProps,
}                                   from "react-router-dom"
import { checkIfAuthenticated }     from "../../helpers"

interface PrivateRouteProps extends RouteProps {
    component: FunctionComponent<any>
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({component: Component, ...rest}) => {
    const isAuthenticated = useSelector(checkIfAuthenticated)

    return (
        <Route
            {...rest}
            render={(props: any) => isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )}
        />
    )
}

export default PrivateRoute
