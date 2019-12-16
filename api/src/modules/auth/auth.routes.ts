import { Router }         from "express"
import { validations }    from "../../core/middleware"
import {
    loginValidation,
    registerValidation,
}                         from "./auth.validations"
import LoginController    from "./LoginController"
import RegisterController from "./RegisterController"

export const AuthRoutes = (router: Router) => {
    router.post("/register", registerValidation, validations, (new RegisterController()).register)
    router.post("/login", loginValidation, validations, (new LoginController()).login)

    return router
}
