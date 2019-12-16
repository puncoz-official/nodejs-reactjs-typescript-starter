import { env }        from "../core/helpers"
import UserRepository from "../data/user/UserRepository"

export const authConfig: AuthConfig = {
    hashRounds: 12,
    tokenExpiry: 60 * 60 * 24, // in seconds
    jwt_secret: env("JWT_SECRET"),

    request: {
        usernameField: "username",
        passwordField: "password",
    },

    authenticationHandler: UserRepository.authenticate,
    tokenAuthenticationHandler: UserRepository.authenticateToken,
}
