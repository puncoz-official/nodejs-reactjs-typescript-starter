import {
    LoginCredential,
    RegisterUserData,
}                  from "../../stores/actions/authActions"
import HttpService from "../HttpService"

class AuthService {
    static async register(userData: RegisterUserData) {
        const {body} = await HttpService.post("/auth/register", userData)

        return body.data
    }

    static async login(credential: LoginCredential) {
        const {body} = await HttpService.post("/auth/login", credential)

        return body.data
    }
}

export default AuthService
