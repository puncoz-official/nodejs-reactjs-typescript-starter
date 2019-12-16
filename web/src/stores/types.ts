import { AuthState }   from "./reducers/auth/types"
import { SystemState } from "./reducers/system/types"

export interface RootState {
    system: SystemState
    auth: AuthState
}

export type OnRequestCallBack = () => Promise<any>
export type OnSuccessCallBack = (response?: any) => void
export type OnErrorCallBack = (error?: any) => void

export interface IActionWithoutPayload<TType> {
    type: TType
}

export const createActionWithoutPayload = <TAction extends IActionWithoutPayload<TAction["type"]>>(
    type: TAction["type"],
): (() => IActionWithoutPayload<TAction["type"]>) => {
    return () => ({
        type,
    })
}

export interface IActionWithPayload<TType, TPayload> {
    type: TType,
    payload: TPayload
}

export const createActionWithPayload = <TAction extends IActionWithPayload<TAction["type"], TAction["payload"]>>(
    type: TAction["type"],
): ((payload: TAction["payload"]) => IActionWithPayload<TAction["type"], TAction["payload"]>) => {
    return (payload) => ({
        type,
        payload,
    })
}
