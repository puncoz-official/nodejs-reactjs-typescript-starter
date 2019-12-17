import { Action }        from "redux"
import { ThunkAction }   from "redux-thunk"
import { SearchService } from "../../services/search"
import { apiCall }       from "../reducers/system/actions"
import {
    OnSuccessCallBack,
    RootState,
}                        from "../types"

export interface SearchParams {
    q: string
}

export interface SearchResponse {

}


export const search = (
    searchParams: SearchParams, onSuccess: OnSuccessCallBack,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    dispatch(apiCall({
        onRequest: async () => SearchService.search(searchParams),
        onSuccess: async (response: SearchResponse) => {
            onSuccess(response)
        },
        onError: (error: any) => {
            console.log(error)
        },
    }))
}
