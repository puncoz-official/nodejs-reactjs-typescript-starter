import React, {
    FormEvent,
    FunctionComponent,
    useCallback,
    useMemo,
    useState,
}                                 from "react"
import {
    Link,
    useHistory,
}                                 from "react-router-dom"
import { config }                 from "../../config"
import { prepareQueryString }     from "../../helpers"
import { SearchParams }           from "../../stores/actions/searchActions"
import SearchField                from "./partials/SearchField"
import { OnChangeCallbackParams } from "./types"

const Search: FunctionComponent = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        q: "",
    })
    const history = useHistory()
    const adminRoutePrefix = useMemo(() => config.app.adminRoutePrefix, [])

    const handleOnChange = useCallback(({name, value}: OnChangeCallbackParams) => {
        setSearchParams(params => ({...params, [name]: value}))
    }, [])

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        history.push(`/${adminRoutePrefix}/search/result?${prepareQueryString(searchParams as any)}`)
    }

    return (
        <div className="search-page">
            <div className="content">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>English CELL Corpus</h2>
                    </div>
                </div>

                <form onSubmit={handleSearch}>
                    <div className="row">
                        <SearchField value={searchParams.q} name="q" onChange={handleOnChange}/>
                    </div>

                    <div className="row">
                        <div className="col-sm-3 offset-9 text-center">
                            <Link to="/" className="btn btn-link">
                                Advanced Search
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search
