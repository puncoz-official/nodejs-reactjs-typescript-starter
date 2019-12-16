import { ReactAppConfig } from "../types/ConfigTypes"
import { Environment }    from "../types/EnvTypes"

const getEnv = <K extends keyof Environment, T>(key: K, defaultValue?: T): T => {
    const value = process.env[key as string] || defaultValue
    if (typeof value === "undefined") {
        throw new Error(`Environment variable not set for key: "${key}"`)
    }

    return value as T
}


const appConfig: ReactAppConfig = {
    api_url: getEnv("REACT_APP_API_URL", ""),
    api_cache: getEnv("REACT_APP_CACHE_API", true),
    authTokenKeyName: "corpus_app_auth_token",
    adminRoutePrefix: "admin",
}

export default appConfig
