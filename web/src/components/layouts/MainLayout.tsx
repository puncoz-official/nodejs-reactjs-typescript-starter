import React, {
    Fragment,
    FunctionComponent,
    useEffect,
}                                from "react"
import { useDispatch }           from "react-redux"
import { loginFromLocalStorage } from "../../stores/actions/authActions"

const MainLayout: FunctionComponent = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loginFromLocalStorage())
    }, [dispatch])

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default MainLayout
