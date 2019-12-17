import {
    useCallback,
    useEffect,
    useState,
} from "react"
import {
    getQueryStringObject,
    QueryStringObject,
    setQueryStringByKey,
    setQueryStringObject,
} from "../helpers"

const useQueryString = () => {
    const [queryString, setQueryString] = useState<QueryStringObject>({})

    useEffect(() => {
        setQueryString(getQueryStringObject())
    }, [])

    const updateQueryStringByKey = useCallback((key: string, value: string): void => {
        setQueryStringByKey(key, value)
    }, [])

    const updateQueryStringObject = useCallback((params: QueryStringObject): void => {
        setQueryStringObject(params)
    }, [])

    return {
        queryStringObject: queryString,
        setQueryStringByKey: updateQueryStringByKey,
        setQueryStringObject: updateQueryStringObject,
    }
}

export default useQueryString
