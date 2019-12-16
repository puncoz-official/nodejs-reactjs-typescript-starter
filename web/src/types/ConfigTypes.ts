export interface Config {
    app: ReactAppConfig
}

export type ReactAppConfig = {
    api_url: string
    api_cache: boolean
    authTokenKeyName: string
    adminRoutePrefix: string
}
