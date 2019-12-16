import { Router }        from "express"
import { auth }          from "../../core/middleware"
import ProfileController from "./ProfileController"

export const ProfileRoutes = (router: Router) => {
    router.get("/me", auth, (new ProfileController()).me)

    return router
}
