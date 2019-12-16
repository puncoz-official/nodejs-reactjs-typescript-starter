import {
    applyMiddleware,
    createStore,
}                              from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk                   from "redux-thunk"
import { ApiMiddleware }       from "./middleware"
import reducers                from "./reducers"

export default () => {
    const initialState = {}
    const middleware = []
    const enhancers: any[] = []

    middleware.push(thunk)
    middleware.push(ApiMiddleware)

    const composedEnhancers = composeWithDevTools(
        applyMiddleware(...middleware),
        ...enhancers,
    )

    return createStore(reducers, initialState, composedEnhancers)
}
