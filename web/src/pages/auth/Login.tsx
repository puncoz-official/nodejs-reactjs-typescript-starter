import {
    get,
    has,
}                               from "lodash"
import React, {
    ChangeEvent,
    FormEvent,
    FunctionComponent,
    useCallback,
    useMemo,
    useState,
}                               from "react"
import {
    useDispatch,
    useSelector,
}                               from "react-redux"
import { Redirect }             from "react-router-dom"
import { config }               from "../../config"
import { checkIfAuthenticated } from "../../helpers"
import {
    login,
    LoginCredential,
}                               from "../../stores/actions/authActions"

type ValidationErrors = Partial<LoginCredential>

const Login: FunctionComponent = () => {
    const [credential, setCredential] = useState<LoginCredential>({
        username: "",
        password: "",
    })
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const [error, setError] = useState("")

    const isAuthenticated = useSelector(checkIfAuthenticated)
    const adminRoutePrefix = useMemo(() => config.app.adminRoutePrefix, [])

    const dispatch = useDispatch()

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget

        setCredential((prevState) => ({...prevState, [name]: value}))
    }, [])

    const handleLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(login(credential, () => {
            console.log("Login Success.")
        }, ({validations, error}) => {
            if (validations) {
                setValidationErrors(validations as ValidationErrors)
            }

            if (error) {
                setError(error)
            }
        }))
    }, [dispatch, credential])

    if (isAuthenticated) {
        return <Redirect to={`/${adminRoutePrefix}`}/>
    }

    return (
        <div className="auth-form content">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form className="clearfix" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username" className="required">Username:</label>
                    <input
                        type="text"
                        className={`form-control ${has(validationErrors, "username") && "is-invalid"}`}
                        name="username"
                        id="username"
                        value={credential.username}
                        onChange={handleOnChange}/>
                    <div className="invalid-feedback">
                        {get(validationErrors, "username")}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="required">Password:</label>
                    <input
                        type="password"
                        className={`form-control ${has(validationErrors, "password") && "is-invalid"}`}
                        name="password"
                        id="password"
                        onChange={handleOnChange}/>
                    <div className="invalid-feedback">
                        {get(validationErrors, "password")}
                    </div>
                </div>

                <button type="submit" className="fa-pull-right btn btn-primary">LOGIN</button>
            </form>
        </div>
    )
}

export default Login
