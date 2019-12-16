import React, {
    Fragment,
    FunctionComponent,
}               from "react"
import { Link } from "react-router-dom"

const GuestNav: FunctionComponent = () => {
    return (
        <Fragment>
            <ul className="navbar-nav mr-auto"/>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Create Account
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="btn btn-secondary">
                        Login
                    </Link>
                </li>
            </ul>
        </Fragment>
    )
}

export default GuestNav
