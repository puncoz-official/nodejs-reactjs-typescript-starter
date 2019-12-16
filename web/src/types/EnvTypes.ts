import { ReactAppConfig } from "./ConfigTypes"

export interface Environment {
    REACT_APP_API_URL: ReactAppConfig["api_url"]
    REACT_APP_CACHE_API?: ReactAppConfig["api_cache"]
}
