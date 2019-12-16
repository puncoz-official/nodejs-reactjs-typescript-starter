import { HTTP_UNAUTHORIZED } from "../constants/HTTPCodes"

export default class UnAuthorizedException extends Error {
    public status: number

    constructor(message?: string) {
        super(message || "Unauthorized")

        this.status = HTTP_UNAUTHORIZED
    }
}
