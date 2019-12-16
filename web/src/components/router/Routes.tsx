import React, {
    Fragment,
    FunctionComponent,
}                   from "react"
import {
    Redirect,
    Route,
    Switch,
}                   from "react-router-dom"
import { routes }   from "../../routes"
import {
    Footer,
    Header,
}                   from "../layouts"
import PrivateRoute from "./PrivateRoute"

const Routes: FunctionComponent = () => {
    return (
        <Fragment>
            {window.location.pathname.includes("index.html") && <Redirect to="/"/>}

            <Header/>

            <main className="container">
                <Switch>
                    {routes.map((route, index) => {
                        if (route.redirect) {
                            return (<Redirect key={index} exact={route.exact} from={route.from} to={route.to}/>)
                        }

                        if (route.auth) {
                            return (<PrivateRoute key={index} exact={route.exact} path={route.path} component={route.component as FunctionComponent}/>)
                        }

                        return (<Route key={index} exact={route.exact} path={route.path} component={route.component}/>)
                    })}
                </Switch>
            </main>

            <Footer/>
        </Fragment>
    )
}

export default Routes
