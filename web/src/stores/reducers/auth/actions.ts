import {
    createActionWithoutPayload,
    createActionWithPayload,
    IActionWithoutPayload,
    IActionWithPayload,
} from "../../types"
import {
    CLEAR_USER,
    SET_TOKEN,
    SET_USER,
    User,
} from "./types"

type SetUserAction = IActionWithPayload<typeof SET_USER, User>
type ClearUserAction = IActionWithoutPayload<typeof CLEAR_USER>
type SetTokenAction = IActionWithPayload<typeof SET_TOKEN, string>

export type AuthActions = SetUserAction | ClearUserAction | SetTokenAction

export const setUser = createActionWithPayload<SetUserAction>(SET_USER)
export const clearUser = createActionWithoutPayload<ClearUserAction>(CLEAR_USER)
export const setToken = createActionWithPayload<SetTokenAction>(SET_TOKEN)
