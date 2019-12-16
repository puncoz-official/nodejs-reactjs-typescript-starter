import { appConfig }      from "./app.config"
import { authConfig }     from "./auth.config"
import { databaseConfig } from "./database.config"

export const config: Config = {
    app: appConfig,
    db: databaseConfig,
    auth: authConfig,
}
