import {
    json,
    urlencoded,
}                                    from "body-parser"
import * as compression              from "compression"
import * as cors                     from "cors"
import * as express                  from "express"
import * as lusca                    from "lusca"
import * as methodOverride           from "method-override"
import * as mongoose                 from "mongoose"
import * as logger                   from "morgan"
import * as passport                 from "passport"
import {
    ExtractJwt,
    Strategy as JWTStrategy,
}                                    from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import { config }                    from "../../config"
import {
    DatabaseConnectionException,
    Handler,
    NotFoundException,
}                                    from "../exceptions"
import { Router }                    from "../router"
import BaseServer                    from "./BaseServer"

const defaultServerOptions: ServerOptions = {
    port: 0,
    environment: "production",
}

class ExpressServer extends BaseServer<express.Application> {
    constructor(options?: ServerOptions) {
        super({...defaultServerOptions, ...options})
    }

    async boot(callback: (options: ServerOptions, server: express.Application) => void): Promise<express.Application> {
        await this.init()

        this.server.listen(this.options.port, () => {
            callback(this.options, this.server)
        })

        return this.server
    }

    private async init(): Promise<void> {
        this.server = express()
        this.server.set("env", this.options.environment)

        this.server.use(compression())
        this.server.use(json())
        this.server.use(urlencoded({extended: true}))
        /** @todo logger for development and production */
        this.server.use(logger("dev"))
        this.server.use(cors())
        this.server.use(methodOverride("_method"))

        this.securityPolicies()
        this.databaseConfig()
        this.configureAuth()
        this.routes()
    }

    private securityPolicies() {
        this.server.use(lusca.xframe("SAMEORIGIN"))
        this.server.use(lusca.xssProtection(true))
        this.server.disable("x-powered-by")
    }

    private async databaseConfig(): Promise<void> {
        mongoose.set("useFindAndModify", false)
        mongoose.set("useCreateIndex", true)
        mongoose.set("useNewUrlParser", true)
        mongoose.set("useUnifiedTopology", true)

        mongoose.connection.on("connected", () => {
            console.info("Mongo Connection Established")
        })
        mongoose.connection.on("reconnected", () => {
            console.info("Mongo Connection Reestablished")
        })
        mongoose.connection.on("disconnected", () => {
            console.info("Mongo Connection Disconnected")
        })
        mongoose.connection.on("close", () => {
            console.log("Mongo Connection Closed")
        })
        mongoose.connection.on("error", (error: any) => {
            throw new DatabaseConnectionException(`MongoDB connection error. Pleas make sure MongoDB is running. ${error.message}`)
        })

        let dbUrl = `${config.db.db_host}:${config.db.db_port}/${config.db.db_name}`
        if (config.db.db_user) {
            dbUrl = `${config.db.db_user}:${config.db.db_pass}@${dbUrl}`
        }

        await mongoose.connect(config.db.db_url || `mongodb://${dbUrl}`)
    }

    private configureAuth() {
        this.server.use(passport.initialize())

        passport.use("login", new LocalStrategy({
            usernameField: config.auth.request.usernameField,
            passwordField: config.auth.request.passwordField,
        }, config.auth.authenticationHandler))

        passport.use("token", new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.auth.jwt_secret,
        }, config.auth.tokenAuthenticationHandler))
    }

    private routes() {
        this.server.use("/v1", (new Router()).setup())

        this.server.use((req: express.Request, res: express.Response, next: any) => {
            throw new NotFoundException()
        })

        this.server.use((error: any, req: express.Request, res: express.Response, next: any) => {
            (new Handler(error, res)).handle()
        })
    }
}

export default ExpressServer
