import { SystemActions } from "./actions"
import {
    SET_IS_LOADING,
    SystemState,
}                        from "./types"

const initialState: SystemState = {
    is_loading: true,
}

const systemReducer = (state: SystemState = initialState, action: SystemActions): SystemState => {
    if (action.type === SET_IS_LOADING) {
        return {...state, is_loading: action.payload}
    }

    return state
}

export default systemReducer
