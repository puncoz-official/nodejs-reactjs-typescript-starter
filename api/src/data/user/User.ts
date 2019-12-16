import { Document } from "mongoose"

export interface User extends Document {
    email: string
    username: string
    password: string

    profile: Profile

    comparePassword: (password: string) => Promise<boolean>
    generateToken: () => string
}

export interface Profile {
    name: string
}
