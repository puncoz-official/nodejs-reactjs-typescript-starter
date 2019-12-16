interface ENV {
    APP_ENV: AppConfig["environment"]
    APP_PORT: AppConfig["port"]
    APP_DEBUG: AppConfig["app_debug"]

    JWT_SECRET: AuthConfig["jwt_secret"]

    DB_NAME: DatabaseConfig["db_name"]
    DB_HOST: DatabaseConfig["db_host"]
    DB_PORT: DatabaseConfig["db_port"]
    DB_USER: DatabaseConfig["db_user"]
    DB_PASS: DatabaseConfig["db_pass"]
    DB_URL: DatabaseConfig["db_url"]
}
