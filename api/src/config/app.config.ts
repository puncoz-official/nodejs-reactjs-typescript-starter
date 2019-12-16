import { env } from "../core/helpers"

export const appConfig: AppConfig = {
    port: env("APP_PORT"),
    environment: env("APP_ENV", "production"),
    app_debug: env("APP_DEBUG", false),
}
