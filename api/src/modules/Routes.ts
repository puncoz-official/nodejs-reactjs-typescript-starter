import { Router }        from "../core/router"
import { AuthRoutes }    from "./auth/auth.routes"
import { ProfileRoutes } from "./profile/profile.routes"

export default (moduleRoutes: Router) => {
    moduleRoutes.register("/auth", AuthRoutes(moduleRoutes.router()))
    moduleRoutes.register("/profile", ProfileRoutes(moduleRoutes.router()))
}
