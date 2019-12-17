import React, {
    ChangeEvent,
    FormEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
}                     from "react"
import useQueryString from "../../hooks/userQueryString"

const SearchResult: FunctionComponent = () => {
    const [searchParams, setSearchParams] = useState({
        q: "",
    })
    const {queryStringObject, setQueryStringObject} = useQueryString()

    useEffect(() => {
        setSearchParams(params => ({...params, ...queryStringObject}))
    }, [queryStringObject])

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget

        setSearchParams(params => ({...params, [name]: value}))
    }, [])

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setQueryStringObject(searchParams)
    }

    return (
        <div className="search-result content">
            <div className="row">
                <div className="col-sm-12">
                    <h4>English CELL Corpus</h4>

                    <form className="row" onSubmit={handleSearch}>
                        <div className="form-group mb-2 col-sm-9">
                            <input type="search" className="form-control" name="q" value={searchParams.q} onChange={handleOnChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-2 col-sm-3">Search</button>
                    </form>
                </div>
            </div>

            <hr/>

            <div className="row results">
                <div className="col-sm-3 advanced-search">
                    Advanced Search
                </div>

                <div className="col-sm-7 results-body">
                    Result
                </div>
            </div>
        </div>
    )
}

export default SearchResult
