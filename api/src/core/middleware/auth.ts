import {
    Request,
    Response,
}                                from "express"
import * as passport             from "passport"
import { User }                  from "../../data/user/User"
import { UnAuthorizedException } from "../exceptions"

export default (req: Request, res: Response, next: any) => {
    passport.authenticate("token", {
        session: false,
    }, (err, user: User, info) => {
        if (!user) {
            return next(new UnAuthorizedException(info.message))
        }

        req.user = user

        return next()
    })(req, res, next)
}
