import { faCube }                   from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }          from "@fortawesome/react-fontawesome"
import React, { FunctionComponent } from "react"
import { useSelector }              from "react-redux"
import { Link }                     from "react-router-dom"
import { checkIfAuthenticated }     from "../../helpers"
import AuthNav                      from "./Nav/AuthNav"
import GuestNav                     from "./Nav/GuestNav"

const Header: FunctionComponent = () => {
    const isAuthenticated = useSelector(checkIfAuthenticated)

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <FontAwesomeIcon className="logo" icon={faCube}/>
                        Cell Corpus
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-menu" aria-controls="navbars-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbars-menu">
                        {isAuthenticated ? <AuthNav/> : <GuestNav/>}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
