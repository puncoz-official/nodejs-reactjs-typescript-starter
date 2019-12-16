class InvalidEnvVariableException extends Error {
    constructor(key: string) {
        super(`Environment variable ${key} not set.`)
    }
}

export default InvalidEnvVariableException
