import { HTTP_NOT_FOUND } from "../constants/HTTPCodes"

class NotFoundException extends Error {
    public status: number

    constructor(message?: string) {
        super(message || "Not found.")

        this.status = HTTP_NOT_FOUND
    }
}

export default NotFoundException
