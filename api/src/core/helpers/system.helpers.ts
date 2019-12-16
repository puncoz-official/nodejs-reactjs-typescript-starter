import { config as dotEnvConfig }      from "dotenv"
import { InvalidEnvVariableException } from "../exceptions"
import * as pathHelper                 from "./path.helpers"

dotEnvConfig({path: pathHelper.rootPath("../.env")})

export const env = <K extends keyof ENV, T>(key: K, defaultValue?: T): T => {
    const value = process.env[key] || defaultValue
    if (typeof value === "undefined") {
        throw new InvalidEnvVariableException(key)
    }

    return value as T
}
