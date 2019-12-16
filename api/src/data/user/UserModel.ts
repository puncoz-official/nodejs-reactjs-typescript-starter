import * as jwt   from "jsonwebtoken"
import {
    Model,
    model,
    Schema,
}                 from "mongoose"
import { config } from "../../config"
import {
    compareBcrypt,
    generateHash,
}                 from "../../core/helpers"
import { User }   from "./User"

export const userSchema: Schema = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,

    profile: {
        name: String,
    },
}, {timestamps: true})

userSchema.pre<User>("save", async function save(next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = await generateHash(this.password)

    next()
})

userSchema.methods.comparePassword = async function comparePassword(password: string): Promise<boolean> {
    return compareBcrypt(password, this.password)
}

userSchema.methods.generateToken = function generateToken(): string {
    const now = (new Date()).getTime()
    const expirationDate = new Date(now)
    expirationDate.setTime(now + config.auth.tokenExpiry * 1000)

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    }, config.auth.jwt_secret)
}

export const UserModel: Model<User> = model<User>("User", userSchema)
