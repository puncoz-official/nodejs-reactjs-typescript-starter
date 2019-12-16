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
    register,
    RegisterUserData,
}                               from "../../stores/actions/authActions"

type ValidationErrors = Partial<RegisterUserData>

const Register: FunctionComponent = () => {
    const [formData, setFormData] = useState<RegisterUserData>({
        full_name: "",
        email: "",
        username: "",
        password: "",
        "confirm-password": "",
    })
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    const isAuthenticated = useSelector(checkIfAuthenticated)
    const adminRoutePrefix = useMemo(() => config.app.adminRoutePrefix, [])

    const dispatch = useDispatch()

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget

        setFormData((prevState) => ({...prevState, [name]: value}))
    }, [])

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(register(formData, () => {
            console.log("Registration Success.")
        }, (errors) => {
            setValidationErrors(errors as ValidationErrors)
        }))
    }, [dispatch, formData])

    if (isAuthenticated) {
        return <Redirect to={`/${adminRoutePrefix}`}/>
    }

    return (
        <div className="auth-form content">
            <form className="clearfix" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        value={formData.full_name}
                        className={`form-control ${has(validationErrors, "full_name") && "is-invalid"}`}
                        onChange={handleOnChange}/>
                    <div className="invalid-feedback">
                        {get(validationErrors, "full_name")}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="email" className="required">Email:</label>
                        <input
                            type="email"
                            className={`form-control ${has(validationErrors, "email") && "is-invalid"}`}
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleOnChange}/>
                        <div className="invalid-feedback">
                            {get(validationErrors, "email")}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="username" className="required">Username:</label>
                        <input
                            type="text"
                            className={`form-control ${has(validationErrors, "username") && "is-invalid"}`}
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleOnChange}/>
                        <div className="invalid-feedback">
                            {get(validationErrors, "username")}
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
                        <label htmlFor="confirmPassword" className="required">Confirm Password:</label>
                        <input
                            type="password"
                            className={`form-control ${has(validationErrors, "confirm-password") && "is-invalid"}`}
                            name="confirm-password"
                            id="confirmPassword"
                            onChange={handleOnChange}/>
                        <div className="invalid-feedback">
                            {get(validationErrors, "confirm-password")}
                        </div>
                    </div>
                </div>

                <button type="submit" className="fa-pull-right btn btn-primary">REGISTER</button>
            </form>
        </div>
    )
}

export default Register
