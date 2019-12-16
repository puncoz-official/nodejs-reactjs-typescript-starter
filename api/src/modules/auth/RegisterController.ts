import {
    Request,
    Response,
}                          from "express"
import { matchedData }     from "express-validator"
import { successResponse } from "../../core/helpers"
import UserRepository      from "../../data/user/UserRepository"
import userTransformer     from "../../data/user/userTransformer"

class RegisterController {
    async register(req: Request, res: Response) {
        const data = matchedData(req)

        const user = await UserRepository.create({
            email: data.email,
            username: data.username,
            password: data.password,

            profile: {
                name: data.name,
            },
        })

        const token = user.generateToken()

        successResponse({res, data: {...userTransformer(user), token}})
    }
}

export default RegisterController
