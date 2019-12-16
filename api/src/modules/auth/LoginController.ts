import {
    Request,
    Response,
}                                from "express"
import * as passport             from "passport"
import { UnAuthorizedException } from "../../core/exceptions"
import { successResponse }       from "../../core/helpers"
import { User }                  from "../../data/user/User"
import userTransformer           from "../../data/user/userTransformer"

class LoginController {
    login(req: Request, res: Response, next: any) {
        passport.authenticate("login", {
            session: false,
        }, (err, user: User, {message}) => {
            if (!user) {
                return next(new UnAuthorizedException(message))
            }

            const token = user.generateToken()

            successResponse({res, data: {...userTransformer(user), token}, message})
        })(req, res, next)
    }
}

export default LoginController
