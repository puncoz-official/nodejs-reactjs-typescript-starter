import { Action }         from "redux"
import { ThunkAction }    from "redux-thunk"
import {
    clearAuthToken,
    getAuthToken,
    setAuthToken,
}                         from "../../helpers"
import { AuthService }    from "../../services/auth"
import { ProfileService } from "../../services/profile"
import {
    clearUser,
    setToken,
    setUser,
}                         from "../reducers/auth/actions"
import { apiCall }        from "../reducers/system/actions"
import {
    OnErrorCallBack,
    OnSuccessCallBack,
    RootState,
}                         from "../types"

export interface RegisterUserData {
    full_name: string
    email: string
    username: string
    password: string
    "confirm-password": string
}

export interface LoginCredential {
    username: string
    password: string
}

export const register = (
    userData: RegisterUserData, onSuccess: OnSuccessCallBack, onError: OnErrorCallBack,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    dispatch(apiCall({
        onRequest: async () => AuthService.register(userData),
        onSuccess: async ({token, ...user}: any) => {
            dispatch(setUser(user))
            dispatch(setToken(token))

            await setAuthToken(token)

            onSuccess()
        },
        onError: (error: any) => {
            if (error.response && error.response.status === 422) {
                onError(error.response.data.data)
            }
        },
    }))
}

export const login = (
    credential: LoginCredential, onSuccess: OnSuccessCallBack, onError: OnErrorCallBack,
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    dispatch(apiCall({
        onRequest: async () => AuthService.login(credential),
        onSuccess: async ({token, ...user}: any) => {
            dispatch(setUser(user))
            dispatch(setToken(token))

            await setAuthToken(token)

            onSuccess()
        },
        onError: (error: any) => {
            if (!error.response) {
                throw error
            }

            if (error.response.status === 401) {
                onError({
                    error: error.response.data.message,
                })
            }

            if (error.response.status === 422) {
                onError({
                    validations: error.response.data.data,
                })
            }
        },
    }))
}

export const loginFromLocalStorage = (onSuccess: OnSuccessCallBack): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    const token = await getAuthToken()

    if (!token) {
        return
    }

    dispatch(apiCall({
        onRequest: async () => ProfileService.getProfile(),
        onSuccess: async (user: any) => {
            dispatch(setUser(user))
            dispatch(setToken(token))

            onSuccess()
        },
        onError: (error: any) => {
            console.log("Not logged in!")
        },
    }))
}

export const logout = (): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    await clearAuthToken()

    dispatch(clearUser())
    dispatch(setToken(""))
}
