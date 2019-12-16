interface Config {
    app: AppConfig
    db: DatabaseConfig
    auth: AuthConfig
}

interface AppConfig {
    port: number
    environment: "production" | "development"
    app_debug: boolean
}

interface DatabaseConfig {
    db_name?: string
    db_host?: string
    db_port?: number
    db_user?: string
    db_pass?: string
    db_url?: string
}

interface AuthConfig {
    hashRounds: number,
    tokenExpiry: number
    jwt_secret: string

    request: {
        usernameField: string,
        passwordField: string,
    }

    authenticationHandler: (username: string, password: string, callback: any) => Promise<void>
    tokenAuthenticationHandler: (jwtPayload: any, done: any) => Promise<void>
}
