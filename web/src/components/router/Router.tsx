import React             from "react"
import { BrowserRouter } from "react-router-dom"
import Routes            from "./Routes"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )
}

export default Router
