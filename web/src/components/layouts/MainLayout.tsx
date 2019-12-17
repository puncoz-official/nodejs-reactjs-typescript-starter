import React, {
    Fragment,
    FunctionComponent,
    useEffect,
}                                from "react"
import {
    useDispatch,
    useSelector,
}                                from "react-redux"
import { loginFromLocalStorage } from "../../stores/actions/authActions"
import { setIsLoading }          from "../../stores/reducers/system/actions"
import { RootState }             from "../../stores/types"
import { Loading }               from "../loading"

const MainLayout: FunctionComponent = ({children}) => {
    const isLoading = useSelector((state: RootState) => state.system.is_loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loginFromLocalStorage(() => {
            dispatch(setIsLoading(false))
        }))
    }, [dispatch])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default MainLayout
