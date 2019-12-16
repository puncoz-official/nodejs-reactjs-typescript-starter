import { env } from "../core/helpers"

export const databaseConfig: DatabaseConfig = {
    db_host: env("DB_HOST", "localhost"),
    db_port: env("DB_PORT", 27017),
    db_name: env("DB_NAME", ""),
    db_user: env("DB_USER", ""),
    db_pass: env("DB_PASS", ""),
    db_url: env("DB_URL", ""),
}
