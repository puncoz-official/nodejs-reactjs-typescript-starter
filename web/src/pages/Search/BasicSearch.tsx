import React, {
    ChangeEvent,
    FormEvent,
    FunctionComponent,
    useCallback,
    useState,
}               from "react"
import { Link } from "react-router-dom"

const BasicSearch: FunctionComponent = () => {
    const [searchText, setSearchText] = useState("")

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget

        setSearchText(value)
    }, [])

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(searchText)
    }

    return (
        <div className="basic-search">
            <div className="content">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>English CELL Corpus</h2>
                    </div>
                </div>

                <form className="row" onSubmit={handleSearch}>
                    <div className="form-group mb-2 col-sm-9">
                        <input type="search" className="form-control" name="search" value={searchText} onChange={handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-2 col-sm-3">Search</button>

                    <div className="col-sm-3 offset-9">
                        <Link to="/" className="btn btn-link">
                            Advanced Search
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BasicSearch
