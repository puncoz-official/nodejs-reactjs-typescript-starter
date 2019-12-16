import { AuthActions } from "./actions"
import * as types      from "./types"

const initialState: types.AuthState = {
    user: {
        id: "",
        email: "",
        username: "",
        display_name: "",
    },
    token: "",
}

const authReducer = (state: types.AuthState = initialState, action: AuthActions): types.AuthState => {
    switch (action.type) {
        case types.SET_USER:
            return {...state, user: action.payload}

        case types.CLEAR_USER:
            return {...state, user: initialState.user}

        case types.SET_TOKEN:
            return {...state, token: action.payload}

        default:
            return state
    }
}

export default authReducer
