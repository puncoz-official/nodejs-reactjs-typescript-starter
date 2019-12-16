class DatabaseConnectionException extends Error {
    constructor(message?: string) {
        super(message || "Database connection error. Pleas make sure database is running.")
    }
}

export default DatabaseConnectionException
