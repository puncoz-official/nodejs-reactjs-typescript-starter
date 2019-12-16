import { HTTP_UNPROCESSABLE_ENTITY } from "../constants/HTTPCodes"

class ValidationException extends Error {
    public status: number
    public errors: Record<string, any>

    constructor(errors: Record<string, any>) {
        super("Validation errors.")

        this.status = HTTP_UNPROCESSABLE_ENTITY
        this.errors = errors
    }
}

export default ValidationException
