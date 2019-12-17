import qs from "qs"

export type QueryStringObject = {
    [key: string]: string
}

export const prepareQueryString = (queryObject: QueryStringObject): string => {
    return qs.stringify(queryObject)
}

export const parseQueryString = (queryString: string): QueryStringObject => {
    return qs.parse(queryString)
}

export const setQueryStringWithoutPageReload = (qsValue: string): void => {
    const {protocol, host, pathname} = window.location
    const preparedUrl = `${protocol}//${host}${pathname}?${qsValue}`

    window.history.pushState({path: preparedUrl}, "", preparedUrl)
}

export const setQueryStringByKey = (key: string, value: string): void => {
    const queryString = parseQueryString(window.location.search.replace(/^[?]/, ""))
    const newQueryString = prepareQueryString({...queryString, [key]: value})

    setQueryStringWithoutPageReload(newQueryString)
}

export const setQueryStringObject = (params: QueryStringObject): void => {
    const queryString = parseQueryString(window.location.search.replace(/^[?]/, ""))
    const newQueryString = prepareQueryString({...queryString, ...params})

    setQueryStringWithoutPageReload(newQueryString)
}

export const getQueryStringObject = (): QueryStringObject => {
    return qs.parse(window.location.search.replace(/^[?]/, ""))
}

export const getQueryStringByKey = (key: string): string => {
    const queryString = getQueryStringObject()

    return queryString[key] || ""
}
