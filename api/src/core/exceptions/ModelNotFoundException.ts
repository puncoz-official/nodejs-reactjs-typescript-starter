import { HTTP_NOT_FOUND } from "../constants/HTTPCodes"

class ModelNotFoundException extends Error {
    public status: number

    constructor(message?: string) {
        super(message || "Model Not found.")

        this.status = HTTP_NOT_FOUND
    }
}

export default ModelNotFoundException
