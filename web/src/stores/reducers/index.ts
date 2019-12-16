import { combineReducers } from "redux"
import { RootState }       from "../types"
import { authReducer }     from "./auth"
import { systemReducer }   from "./system"

export default combineReducers<RootState>({
    system: systemReducer,
    auth: authReducer,
})
