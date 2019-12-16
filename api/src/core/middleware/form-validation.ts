import { Request, Response }                from "express"
import { ErrorFormatter, validationResult } from "express-validator"
import { ValidationException }              from "../exceptions"

export default (req: Request, res: Response, next: any) => {
    const errorFormatter: ErrorFormatter = ({location, msg, param, value, nestedErrors}) => msg

    const errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        throw new ValidationException(errors.mapped())
    }

    next()
}
