import { check }      from "express-validator"
import UserRepository from "../../data/user/UserRepository"

export const loginValidation = [
    check("username").not().isEmpty().withMessage("Username is required.").isString(),
    check("password").not().isEmpty().withMessage("Password is required.").isString(),
]

export const registerValidation = [
    check("email")
        .not().isEmpty().withMessage("Email is required.")
        .isString()
        .normalizeEmail().isEmail().withMessage("Invalid email format.")
        .custom(async (email: string) => {
            try {
                await UserRepository.getByKey("email", email)
            } catch (error) {
                return true
            }

            throw new Error("Email already exists.")
        }),

    check("username")
        .not().isEmpty().withMessage("Username is required.")
        .isString()
        .custom(async (username: string) => {
            try {
                await UserRepository.getByKey("username", username)
            } catch (error) {
                return true
            }

            throw new Error("Username already exists.")
        }),

    check("password")
        .not().isEmpty().withMessage("Password is required")
        .isString()
        .isLength({min: 6})
        .withMessage("Password should be greater than 6 characters long."),

    check("confirm-password")
        .not().isEmpty().withMessage("Password is required")
        .isString()
        .custom(async (password, {req}) => {
            if (password === req.body.password) {
                return true
            }
            throw new Error(
                "Password confirmation does not match password",
            )
        }),

    check("name").optional(),
]
