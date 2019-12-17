import React, {
    ChangeEvent,
    Fragment,
    FunctionComponent,
    useCallback,
}                           from "react"
import { OnChangeCallback } from "../types"

interface SearchFieldProps {
    name: string
    value: string,
    onChange: OnChangeCallback
}

const SearchField: FunctionComponent<SearchFieldProps> = ({name, value, onChange}) => {
    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget

        onChange({name, value})
    }, [onChange])

    return (
        <Fragment>
            <div className="form-group mb-2 col-sm-9">
                <input type="search" className="form-control" name={name} value={value} onChange={handleOnChange}/>
            </div>
            <div className="col-sm-3">
                <button type="submit" className="btn btn-primary btn-block mb-2">Search</button>
            </div>
        </Fragment>
    )
}

export default SearchField
