import {
    Request,
    Response,
}                          from "express"
import { successResponse } from "../../core/helpers"
import { User }            from "../../data/user/User"
import userTransformer     from "../../data/user/userTransformer"

class ProfileController {
    me(req: Request, res: Response) {
        const user = userTransformer(req.user as User)

        successResponse({res, data: user})
    }
}

export default ProfileController
