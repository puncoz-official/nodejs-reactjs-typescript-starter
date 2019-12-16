import * as chalk from "chalk"
import { config } from "./config"
import { Server } from "./core/server"

(async () => {
    const serverOptions: ServerOptions = {
        port: config.app.port,
        environment: config.app.environment,
    }

    await (new Server(serverOptions)).boot(({port}, server) => {
        console.info(`${chalk.green("✓")} App is running at http://localhost:${port} in ${server.get("env")} mode`)
        console.info("  Press CTRL-C to stop\n")
    })

    process.on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at:", p, "reason:", reason)
    })
})()
