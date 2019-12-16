import {
    AnyAction,
    Dispatch,
    Middleware,
    MiddlewareAPI,
}                      from "redux"
import {
    ApiCallPayload,
    ApiRequestAction,
}                      from "../reducers/system/actions"
import { API_REQUEST } from "../reducers/system/types"

const ApiMiddleware: Middleware<Dispatch> = (
    {dispatch}: MiddlewareAPI,
) => next => async (
    action: AnyAction | ApiRequestAction,
) => {
    next(action)

    if (action.type !== API_REQUEST) {
        return
    }

    const {onRequest, onSuccess, onError} = action.payload as ApiCallPayload

    try {
        const response = await onRequest()

        if (onSuccess) {
            onSuccess(response)
        }
    } catch (error) {
        if (!onError) {
            throw error
        }

        onError(error)
    }
}

export default ApiMiddleware
