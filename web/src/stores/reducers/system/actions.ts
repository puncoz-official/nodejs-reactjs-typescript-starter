import {
    createActionWithPayload,
    IActionWithPayload,
    OnErrorCallBack,
    OnRequestCallBack,
    OnSuccessCallBack,
} from "../../types"
import {
    API_REQUEST,
    SET_IS_LOADING,
} from "./types"


export interface ApiCallPayload {
    onRequest: OnRequestCallBack
    onSuccess?: OnSuccessCallBack
    onError?: OnErrorCallBack
}

export type SetIsLoadingAction = IActionWithPayload<typeof SET_IS_LOADING, boolean>
export type ApiRequestAction = IActionWithPayload<typeof API_REQUEST, ApiCallPayload>

export type SystemActions = SetIsLoadingAction

export const setIsLoading = createActionWithPayload<SetIsLoadingAction>(SET_IS_LOADING)
export const apiCall = createActionWithPayload<ApiRequestAction>(API_REQUEST)
