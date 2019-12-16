import { Response }                from "express"
import { HTTP_NOT_FOUND, HTTP_OK } from "../constants/HTTPCodes"

interface JSONResponse {
    status: boolean
    message?: string
    data?: any
    metadata?: any
}

const prepareResponse = (response: Partial<JSONResponse>): JSONResponse => {
    let jsonResponse: JSONResponse = {
        status: response.status === undefined ? true : response.status,
    }

    if (response.message) {
        jsonResponse = {...jsonResponse, message: response.message}
    }

    if (response.data) {
        jsonResponse = {...jsonResponse, data: response.data}
    }

    if (response.metadata) {
        jsonResponse = {...jsonResponse, metadata: response.metadata}
    }

    return jsonResponse
}

interface SuccessResponseParams {
    res: Response
    data?: any
    message?: string
    metadata?: any
    code?: number
}

export const successResponse = (params: SuccessResponseParams) => {
    params.res.status(params.code || HTTP_OK).json(prepareResponse({
        status: true,
        data: params.data,
        metadata: params.metadata,
        message: params.message,
    }))
}

interface ErrorResponseParams {
    res: Response
    errors?: any
    message?: string
    code?: number
}

export const errorResponse = (params: ErrorResponseParams) => {
    params.res.status(params.code || HTTP_NOT_FOUND).json(prepareResponse({
        status: false,
        data: params.errors,
        message: params.message || "Not Found.",
    }))
}
