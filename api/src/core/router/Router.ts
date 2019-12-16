import * as express     from "express"
import { ModuleRoutes } from "../../modules"

class Router {
    private readonly expressRouter: express.Router

    constructor() {
        this.expressRouter = express.Router({mergeParams: true})
    }

    public setup(): express.Router {
        ModuleRoutes(this)

        return this.expressRouter
    }

    public register(...handlers: any) {
        this.expressRouter.use(...handlers)
    }

    public router() {
        return express.Router({mergeParams: true})
    }
}

export default Router
