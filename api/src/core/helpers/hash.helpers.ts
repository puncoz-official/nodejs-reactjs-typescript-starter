import * as Bcrypt from "bcrypt"
import { config }  from "../../config"

export const isBycryptedHash = (str: string): boolean => /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/.test(str)

export const generateHash = (password: string): Promise<string> => {
    if (!password) {
        return Promise.resolve(password)
    }

    if (isBycryptedHash(password)) {
        return Promise.resolve(password)
    }

    return Bcrypt.hash(password, config.auth.hashRounds)
}

export const compareBcrypt = async (plainString: string, hashString: string): Promise<boolean> => {
    return Bcrypt.compare(plainString, hashString)
}
