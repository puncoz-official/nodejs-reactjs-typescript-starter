import { VerifiedCallback }       from "passport-jwt"
import { IVerifyOptions }         from "passport-local"
import { config }                 from "../../config"
import { ModelNotFoundException } from "../../core/exceptions"
import { User }                   from "./User"
import { UserModel }              from "./UserModel"

type AuthenticateCallback = (error: any, user?: any, options?: IVerifyOptions) => void

class UserRepository {
    static async authenticate(username: string, password: string, callback: AuthenticateCallback): Promise<void> {
        const user = await UserModel.findOne({[config.auth.request.usernameField]: username})

        if (user && await user.comparePassword(password)) {
            return callback(null, user, {message: "Login Success."})
        }

        return callback(null, null, {message: "Invalid Login"})
    }

    static async authenticateToken(jwtPayload: any, done: VerifiedCallback): Promise<void> {
        const user = await UserModel.findById(jwtPayload.id)

        if (!user) {
            return done("UnAuthenticated")
        }

        return done(null, user)
    }

    static async getByKey(key: string, value: string): Promise<User> {
        const user = await UserModel.findOne({[key]: value})

        if (!user) {
            throw new ModelNotFoundException(`User with ${key}:${value} not found.`)
        }

        return user
    }

    static async create(userData: {}): Promise<User> {
        const user = new UserModel(userData)

        return user.save()
    }
}

export default UserRepository
