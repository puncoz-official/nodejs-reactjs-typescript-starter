import { Response }          from "express"
import { config }            from "../../config"
import {
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_UNAUTHORIZED,
    HTTP_UNPROCESSABLE_ENTITY,
}                            from "../constants/HTTPCodes"
import { errorResponse }     from "../helpers"
import NotFoundException     from "./NotFoundException"
import UnAuthorizedException from "./UnAuthorizedException"
import ValidationException   from "./ValidationException"

class Handler {
    private readonly error: any
    private readonly res: Response
    private readonly debug: boolean

    constructor(error: any, res: Response) {
        this.error = error
        this.res = res
        this.debug = config.app.app_debug
    }

    public handle() {
        if (this.error instanceof NotFoundException) {
            return this.handleNotFound()
        }

        if (this.error instanceof ValidationException) {
            return this.handleValidationError()
        }

        if (this.error instanceof UnAuthorizedException) {
            return this.handleUnAuthorized()
        }

        this.handleServerError()
    }

    private handleNotFound() {
        errorResponse({
            res: this.res,
        })
    }

    private handleValidationError() {
        errorResponse({
            res: this.res,
            code: this.error.status || HTTP_UNPROCESSABLE_ENTITY,
            errors: this.error.errors,
            message: this.error.message,
        })
    }

    private handleUnAuthorized() {
        errorResponse({
            res: this.res,
            code: this.error.status || HTTP_UNAUTHORIZED,
            message: this.error.message,
        })
    }

    private handleServerError() {
        console.error(this.error)
        errorResponse({
            res: this.res,
            code: HTTP_INTERNAL_SERVER_ERROR,
            message: this.debug ? this.error.message : "Server error.",
            errors: this.debug ? this.error : null,
        })
    }
}

export default Handler
